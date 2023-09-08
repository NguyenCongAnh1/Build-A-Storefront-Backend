
import supertest from 'supertest';
import app from '../../server'

const request = supertest(app);
const token = process.env.TOKEN_TEST!;
describe("User Endpoints", () => {

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

