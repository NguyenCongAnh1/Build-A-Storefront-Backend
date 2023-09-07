# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index GET method ('/products'): returns array of products
- Show GET method ('products/:id'): returns a single product object
- Create [token required] POST method ('/products'): creates and returns product object
- Top 5 most popular products GET method ('/five_most_popular_products'): returns an array of five most popular products. I used a service `dashboard.ts` to perform this function

#### Users

- Index [token required] GET method ('/users'): returns an array of users
- Show [token required] GET method ('users/:id'): returns a single user
- Create [token required] POST method ('/users'): returns the single user that is created in the database

#### Orders

- Current Order by user (args: user id)[token required] GET method ('/orders/currentOrders/:id'): returns an order 
- [OPTIONAL] Completed Orders by user (args: user id)[token required] GET method ('/orders/completedOrders/:id'): returns an array of completed orders

## Data Shapes

#### products table

| Columns | Types                |
| ------- | ---------------------|
| id      | SERIAL PRIMARY KEY   |
| name    | VARCHAR(255)         |
| price   | NUMERIC(10, 2)       |

#### users table

| Columns         | Types                 |
| --------------- | ----------------------|
| id              | SERIAL PRIMARY KEY    |
| first_name      | VARCHAR(255)          |
| last_name       | VARCHAR(255)          |
| password_digest | VARCHAR               |

#### orders table

| Columns   | Types                                |
| --------- | ------------------------------------ |
| id        | SERIAL PRIMARY KEY                   |
| product_id| bigint REFERENCES products(id)       |
| quantity  | INTEGER NOT NULL                     |
| user_id   | bigint REFERENCES users(id)          |
| status    | VARCHAR                              |





