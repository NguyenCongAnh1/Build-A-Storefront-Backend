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

const addProduct = async (req: Request, res: Response) =>{
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    debugger
    try{
        const addProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addProduct);
    }catch(err){
        res.status(400)
        res.json(err)
    }
};

const ordersRoutes = (app: express.Application) => {
    app.get('/orders/currentOrders/:id',verifyAuthToken,currentOrderByUser);
    app.get('/orders/completedOrders/:id',verifyAuthToken,completedOrdersByUser);
    app.post('/orders/:id/products',verifyAuthToken,addProduct);
}


export default ordersRoutes;