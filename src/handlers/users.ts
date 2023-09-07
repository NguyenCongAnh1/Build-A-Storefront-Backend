import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../utilities/verifyAuthToken '


const store = new UserStore()
// handler functions here

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }
  try {
    const newUser = await store.create(user)
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  return res.json(users)
};

const show = async (req: Request, res: Response) => {
  const users = await store.show(req.params.id);
  return res.json(users);
};


const userRoutes = (app: express.Application) => {
  // Express routes here
  app.get('/users',verifyAuthToken, index);
  app.get('/users/:id',verifyAuthToken, show);
  app.post('/users',verifyAuthToken, create);
}
export default userRoutes