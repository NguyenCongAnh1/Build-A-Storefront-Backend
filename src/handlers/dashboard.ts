import { DashboardQueries } from "../services/dashboard";
import express, { Request, Response } from 'express'



const dashboard = new DashboardQueries();

// const productInOrders = async(_req: Request, res: Response) => {
//     const products = await dashboard.productInOrders();
//     res.json(products);
// }

const fiveMostPopularProducts = async(_req: Request, res: Response) => {
    const fiveMostExpensiveProducts = await dashboard.fiveMostPopularProducts();
    res.json(fiveMostExpensiveProducts);
}

const dashboardRoutes = (app = express.application) =>{
    // app.get('/products_in_order', productInOrders)
    app.get('/five_most_popular_products', fiveMostPopularProducts)
}

export default dashboardRoutes