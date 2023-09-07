// @ts-ignore
import Client from '../database'

export type Order = {
    id?: string;
    status: string;
    userId: string;
    productId: string;
    quantity: number;

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
            const sql = 'INSERT INTO orders (product_id,quantity, user_id,status ) VALUES($1, $2,$3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [theOrder.productId, theOrder.quantity, theOrder.userId, theOrder.status]);
            const product = result.rows[0];
            conn.release();
            return product
        } catch (err) {
            throw new Error(`Could not add order. Error: ${err}`)
        }
    }


}

