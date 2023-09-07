/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id bigint REFERENCES users(id),
    status VARCHAR
);