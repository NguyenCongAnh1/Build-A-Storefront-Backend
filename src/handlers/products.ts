import express, { Request, Response } from 'express'
import { Product, productStore } from '../models/products';
import verifyAuthToken from '../utilities/verifyAuthToken ';

const store = new productStore()
// handler functions here
const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    return res.json(products)
};

const show = async (req: Request, res: Response) => {
    const products = await store.show(req.params.id);
    return res.json(products);
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const productsRoutes = (app: express.Application) => {
    // Express routes here
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
}
export default productsRoutes