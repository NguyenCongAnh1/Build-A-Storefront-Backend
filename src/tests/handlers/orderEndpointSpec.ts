
import supertest from 'supertest';
import app from '../../server'
    // @ts-ignore
import Client from '../../database'
import { ordersStore } from '../../models/orders';
import { UserStore } from '../../models/users';
import { productStore } from '../../models/products';

const request = supertest(app);
const token = process.env.TOKEN_TEST!;

const orderStore = new ordersStore();
const userStore = new UserStore();
const ProductStore = new productStore();

describe("Orders Endpoints", () => {

    beforeAll(async () => {
        await userStore.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
        });

        await ProductStore.create({
            name: 'product1',
            price: 9.99
        });

        await orderStore.create({
            userId: '1',
            status: 'active'
        });

        await orderStore.create({
            userId: '1',
            status: 'complete'

        });
    });

    afterAll(async () => {
        const sql = `DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; 
                    DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; 
                    DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; 
                    DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;`
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })


    it('Test /orders/currentOrders/:id GET route ', async () => {
        await request.get('/orders/currentOrders/1')
            .auth(`${token}`, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
            
    });

    it('Test /orders/completedOrders/:id GET route ', async () => {
        await request.get('/orders/completedOrders/1')
            .auth(`${token}`, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
            
    });
    it('Test /orders/:id/products POST route ', async () => {
        const product = {
            "productId": "1",
            "quantity": 24
        }
        await request.post('/orders/1/products')
            .auth(`${token}`, { type: 'bearer' })
            .send(product)
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
    });


});

