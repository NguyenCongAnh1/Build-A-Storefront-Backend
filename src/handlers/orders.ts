import verifyAuthToken from '../utilities/verifyAuthToken ';
import { ordersStore } from './../models/orders';

import express, { Request, Response } from 'express'

const store = new ordersStore();

const currentOrderByUser = async (_req: Request, res: Response) => {
    const orders = await store.currentOrderByUser(_req.params.id);
    res.json(orders);
}

const completedOrdersByUser = async (_req: Request, res: Response) => {
    const orders = await store.completedOrdersByUser(_req.params.id);
    res.json(orders);
}


const ordersRoutes = (app: express.Application) => {
    app.get('/orders/currentOrders/:id',verifyAuthToken,currentOrderByUser);
    app.get('/orders/completedOrders/:id',verifyAuthToken,completedOrdersByUser);
}


export default ordersRoutes;