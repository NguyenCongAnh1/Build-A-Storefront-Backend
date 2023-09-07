import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import dashboardRoutes from './handlers/dashboard';
import ordersRoutes from './handlers/orders';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
app.use(bodyParser.json())


userRoutes(app);
productsRoutes(app);
dashboardRoutes(app);
ordersRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
