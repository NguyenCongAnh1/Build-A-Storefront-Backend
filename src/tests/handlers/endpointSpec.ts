
import supertest from 'supertest';
import app from '../../server'
import express from 'express';
import userRoutes from '../../handlers/users';



const request = supertest(app);

fdescribe("User Endpoints", () => {

    it('Test /users POST route ', async () => {
        const user = {
            "firstName": "Anh",
            "lastName": "Nguyen",
            "password": "kakakakakakakaka"
        };

        await request.post('/users')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiQWxpY2UiLCJsYXN0X25hbWUiOiJKb2huc29uIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJHhTWDR3Z1lXWHhDYVRhS0JYUXhZMS5EOGprV20ySVBmUk5sbWRoRWNsa0xBQWF1Y0ZhcE5DIn0sImlhdCI6MTY5MzkyNTQ3OH0.uske3kXfhh3RgUCXn7gS8glewJo9Ar3mJmOFVBFGamA', { type: 'bearer' })
            .send(user)
            .expect(200)
            .then(async (res: any) => {
                expect(res.body).toBeTruthy;
            })
            .catch((error: Error) => console.error(error.message));
    });

    
    


});

