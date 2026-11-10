from contextlib import asynccontextmanager
from pathlib import Path
import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import select
from .db import database, migrate
from .models import Product, Order
from .schemas import ProductInput, ProductPatch, ProductRead, OrderInput, OrderRead
from .security import identity, manager, validate_accounts
from .service import DomainError, checkout, seed

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


def create_app(database_url=None, kind=None):
    engine, sessions = database(database_url or os.environ.get("DATABASE_URL", "sqlite:///./build-lab.db"))
    project_kind = kind or os.environ.get("PROJECT_KIND", "pos")
    if project_kind not in {"pos", "shop"}:
        raise ValueError("PROJECT_KIND must be pos or shop")

    @asynccontextmanager
    async def lifespan(_):
        validate_accounts()
        migrate(engine)
        with sessions.begin() as session:
            seed(session)
        yield
        engine.dispose()

    app = FastAPI(title="Build Lab Commerce API", lifespan=lifespan)

    def get_session():
        with sessions() as session:
            yield session

    @app.exception_handler(DomainError)
    async def domain_error(_: Request, exc: DomainError):
        return JSONResponse(status_code=exc.status, content={"detail": exc.detail})

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    @app.get("/api/ready")
    def ready(session=Depends(get_session)):
        session.execute(select(Product.id).limit(1))
        return {"status": "ready"}

    @app.get("/api/products", response_model=list[ProductRead])
    def products(session=Depends(get_session)):
        return session.scalars(select(Product).order_by(Product.id)).all()

    @app.post("/api/products", response_model=ProductRead, status_code=201)
    def add_product(payload: ProductInput, user=Depends(manager), session=Depends(get_session)):
        with session.begin():
            product = Product(**payload.model_dump())
            session.add(product)
            session.flush()
        return product

    @app.patch("/api/products/{product_id}", response_model=ProductRead)
    def edit_product(product_id: int, payload: ProductPatch, user=Depends(manager), session=Depends(get_session)):
        with session.begin():
            product = session.get(Product, product_id)
            if product is None:
                raise HTTPException(404, "Product not found")
            product.name, product.price_minor = payload.name, payload.price_minor
        return product

    @app.post("/api/orders", response_model=OrderRead, status_code=201)
    def add_order(payload: OrderInput, user=Depends(identity), session=Depends(get_session)):
        with session.begin():
            order = checkout(session, payload, user["name"], project_kind)
        return order

    @app.get("/api/orders", response_model=list[OrderRead])
    def orders(user=Depends(manager), session=Depends(get_session)):
        return session.scalars(select(Order).order_by(Order.id.desc()).limit(100)).all()

    return app


app = create_app()
