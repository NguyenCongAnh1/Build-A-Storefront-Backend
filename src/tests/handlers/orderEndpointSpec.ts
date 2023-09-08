
import supertest from 'supertest';
import app from '../../server'

const request = supertest(app);
const token = process.env.TOKEN_TEST!;
describe("Orders Endpoints", () => {

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

