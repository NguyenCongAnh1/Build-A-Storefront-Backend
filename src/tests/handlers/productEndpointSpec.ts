
import supertest from 'supertest';
import app from '../../server'

const request = supertest(app);
const token = process.env.TOKEN_TEST!;
describe("Products Endpoints", () => {

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

