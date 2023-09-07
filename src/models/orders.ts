// @ts-ignore
import Client from '../database'

export type Order = {
    id?: string;
    status: string;
    userId: string;
}

export class ordersStore {
    async currentOrderByUser(id: string): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const orders = result.rows;
            conn.release()
            return orders
        } catch (err) {
            throw new Error(`Could not get orders ${id}. Error: ${err}`)
        }
    }

    async completedOrdersByUser(id: string): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='complete'`;
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const orders = result.rows;
            conn.release()
            return orders
        } catch (err) {
            throw new Error(`Could not get orders ${id}. Error: ${err}`)
        }
    }

    async create(theOrder: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [theOrder.userId, theOrder.status]);
            const product = result.rows[0];
            conn.release();
            return product
        } catch (err) {
            throw new Error(`Could not add order. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [quantity, orderId, productId])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }


}

