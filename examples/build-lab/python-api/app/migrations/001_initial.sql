CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) NOT NULL,
    price_minor INTEGER NOT NULL CHECK (price_minor >= 0 AND price_minor <= 100000000),
    stock INTEGER NOT NULL CHECK (stock >= 0 AND stock <= 1000000)
);
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status VARCHAR(20) NOT NULL,
    customer VARCHAR(80) NOT NULL DEFAULT '',
    address VARCHAR(300) NOT NULL DEFAULT '',
    total_minor INTEGER NOT NULL CHECK (total_minor >= 0),
    created_at VARCHAR(40) NOT NULL,
    actor VARCHAR(80) NOT NULL
);
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0 AND quantity <= 1000),
    unit_price_minor INTEGER NOT NULL CHECK (unit_price_minor >= 0),
    UNIQUE (order_id, product_id)
);
