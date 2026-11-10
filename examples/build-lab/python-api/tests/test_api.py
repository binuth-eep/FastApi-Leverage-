import pytest
from fastapi.testclient import TestClient
from app.main import create_app

MANAGER = ("manager", "test-manager-password")
CASHIER = ("cashier", "test-cashier-password")


@pytest.fixture
def client(tmp_path, monkeypatch):
    for role, credentials in [("MANAGER", MANAGER), ("CASHIER", CASHIER)]:
        monkeypatch.setenv(f"{role}_USERNAME", credentials[0])
        monkeypatch.setenv(f"{role}_PASSWORD", credentials[1])
    with TestClient(create_app(f"sqlite:///{tmp_path / 'test.db'}", "pos")) as test_client:
        yield test_client


def body(quantity=2):
    return {"items": [{"product_id": 1, "quantity": quantity}]}


def test_health_and_catalog(client):
    assert client.get("/api/health").json() == {"status": "ok"}
    assert client.get("/api/ready").status_code == 200
    assert len(client.get("/api/products").json()) == 4


def test_checkout_uses_server_prices_and_persists(client):
    response = client.post("/api/orders", json=body(), auth=CASHIER)
    assert response.status_code == 201
    assert response.json()["total_minor"] == 90000
    assert response.json()["items"][0]["unit_price_minor"] == 45000
    assert client.get("/api/products").json()[0]["stock"] == 1
    assert len(client.get("/api/orders", auth=MANAGER).json()) == 1


def test_insufficient_stock_rolls_back_all_items(client):
    payload = {"items": [{"product_id": 1, "quantity": 1}, {"product_id": 2, "quantity": 99}]}
    assert client.post("/api/orders", json=payload, auth=CASHIER).status_code == 409
    assert client.get("/api/products").json()[0]["stock"] == 3
    assert client.get("/api/orders", auth=MANAGER).json() == []


@pytest.mark.parametrize("quantity", [0, -1, 1.5, "2", True, 1001])
def test_strict_quantities(client, quantity):
    assert client.post("/api/orders", json=body(quantity), auth=CASHIER).status_code == 422


def test_unknown_product(client):
    assert client.post("/api/orders", json={"items": [{"product_id": 999, "quantity": 1}]}, auth=CASHIER).status_code == 404


def test_identity_and_permissions(client):
    assert client.post("/api/orders", json=body()).status_code == 401
    assert client.post("/api/orders", json=body(), auth=("cashier", "wrong-password")).status_code == 401
    assert client.get("/api/orders", auth=CASHIER).status_code == 403


def test_no_client_price_or_duplicate_rows(client):
    assert client.post("/api/orders", json={**body(), "total_minor": 1}, auth=CASHIER).status_code == 422
    assert client.post("/api/orders", json={"items": body()["items"] * 2}, auth=CASHIER).status_code == 422


def test_price_snapshot(client):
    client.post("/api/orders", json=body(1), auth=CASHIER)
    assert client.patch("/api/products/1", json={"name": "Notebook", "price_minor": 99999}, auth=MANAGER).status_code == 200
    assert client.get("/api/orders", auth=MANAGER).json()[0]["items"][0]["unit_price_minor"] == 45000


def test_restart_preserves_data_and_seed_is_not_duplicated(client):
    client.post("/api/orders", json=body(1), auth=CASHIER)
    # Re-entering the same lifespan applies no migrations twice and keeps existing records.
    with TestClient(client.app) as restarted:
        assert len(restarted.get("/api/products").json()) == 4
        assert restarted.get("/api/products").json()[0]["stock"] == 2
        assert len(restarted.get("/api/orders", auth=MANAGER).json()) == 1


def test_shop_requires_delivery_fields(tmp_path, monkeypatch):
    for role, credentials in [("MANAGER", MANAGER), ("CASHIER", CASHIER)]:
        monkeypatch.setenv(f"{role}_USERNAME", credentials[0])
        monkeypatch.setenv(f"{role}_PASSWORD", credentials[1])
    with TestClient(create_app(f"sqlite:///{tmp_path / 'shop.db'}", "shop")) as shop:
        assert shop.post("/api/orders", json=body(1), auth=CASHIER).status_code == 422
        response = shop.post("/api/orders", json={**body(1), "customer": "Amali", "address": "12 Temple Road, Kandy"}, auth=CASHIER)
        assert response.status_code == 201
