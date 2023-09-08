
import supertest from 'supertest';
import app from '../../server'

const request = supertest(app);
const token = process.env.TOKEN_TEST!;

describe("Dashboard Endpoints", () => {
    it('Test /five_most_popular_products GET route ', async () => {
        await request.get('/five_most_popular_products')
            .send()
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
            
    });
});

