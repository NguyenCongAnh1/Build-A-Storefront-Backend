
import supertest from 'supertest';
import app from '../../server'
// @ts-ignore
import Client from '../../database'

const request = supertest(app);
const token = process.env.TOKEN_TEST!;
describe("User Endpoints", () => {

    afterAll(async () => {
        const sql = `DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; 
                    DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; 
                    DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; 
                    DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;`
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })

    it('Test /users POST route ', async () => {
        const user = {
            "firstName": "Anh",
            "lastName": "Nguyen",
            "password": "kakakakakakakaka"
        };
        await request.post('/users')
            .auth(`${token}`, { type: 'bearer' })
            .send(user)
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
    });

    it('Test /users GET route ', async () => {

        await request.get('/users')
            .auth(`${token}`, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
    });
    
    it('Test /users/:id GET route ', async () => {
        await request.get('/users/1')
            .auth(`${token}`, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
    });


});

