from datetime import datetime, timezone
from sqlalchemy import select, update
from .models import Product, Order, OrderItem


class DomainError(Exception):
    def __init__(self, status: int, detail: str):
        self.status, self.detail = status, detail


def checkout(session, payload, actor: str, kind: str):
    if kind == "shop" and (not payload.customer or not payload.address):
        raise DomainError(422, "Customer name and delivery address are required")
    order = Order(status="COMPLETED", customer=payload.customer, address=payload.address,
                  total_minor=0, created_at=datetime.now(timezone.utc).isoformat(), actor=actor)
    session.add(order)
    session.flush()
    for item in sorted(payload.items, key=lambda row: row.product_id):
        product = session.get(Product, item.product_id)
        if product is None:
            raise DomainError(404, f"Product {item.product_id} not found")
        price = product.price_minor
        result = session.execute(update(Product).where(Product.id == item.product_id,
                                 Product.stock >= item.quantity).values(stock=Product.stock - item.quantity))
        if result.rowcount != 1:
            raise DomainError(409, f"Not enough stock for {product.name}")
        order.items.append(OrderItem(product_id=product.id, quantity=item.quantity, unit_price_minor=price))
        order.total_minor += price * item.quantity
    session.flush()
    return order


def seed(session):
    if session.scalar(select(Product.id).limit(1)) is None:
        session.add_all([
            Product(name="Notebook", price_minor=45000, stock=3),
            Product(name="Everyday mug", price_minor=65000, stock=4),
            Product(name="Canvas tote", price_minor=120000, stock=8),
            Product(name="Desk planter", price_minor=85000, stock=6),
        ])
