
import supertest from 'supertest';
import app from '../../server'
    // @ts-ignore
import Client from '../../database'
const request = supertest(app);
const token = process.env.TOKEN_TEST!;
describe("Products Endpoints", () => {


    afterAll(async () => {
        const sql = `DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; 
                    DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; 
                    DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; 
                    DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;`
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })

    it('Test /products POST route ', async () => {
        const product = {
            "name": "Product4",
            "price": 19.99
        };

        await request.post('/products')
            .auth(`${token}`, { type: 'bearer' })
            .send(product)
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toEqual(jasmine.objectContaining({
                    "name": "Product4",
                    "price": "19.99"
                }));
            })
            
    });

    it('Test /products GET route ', async () => {

        await request.get('/products')
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
            
    });

    
    it('Test /products/:id GET route ', async () => {
        await request.get('/products/1')
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
    });


});

