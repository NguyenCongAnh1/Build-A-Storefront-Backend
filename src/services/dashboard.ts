// @ts-ignore
import Client from '../database'

export class DashboardQueries {
    // Get all product that have been included in order

    // async productInOrders(): Promise<{name: string, price: number, order_id: string}[]>{
    //     try{
    //         const conn = await Client.connect();
    //         const sql = 'SELECT name, price, order_id FROM products JOIN order_products ON products.id = order_products.id'
    //         const result = await conn.query(sql);
    //         conn.release();
    //         return result.rows;
    //     }catch(e){
    //         throw new Error(`Unable to get products and orders: ${e}`)
    //     }
    // }

    // async fiveMostExpensiveProducts(): Promise<{name: string, price: number}[]> {
    //     try{
    //         const conn = await Client.connect();
    //         const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
    //         const result = await conn.query(sql);
    //         return result.rows;
    //     }catch(err){
    //         throw new Error(`${err}`)
    //     }

    // }

    async fiveMostPopularProducts(): Promise<{ name: string, price: number, total_quantity: number }[]> {
        try {
            const sql =`SELECT p.name, p.price, total_quantity
            FROM products p
            INNER JOIN (
                SELECT product_id, SUM(quantity) as total_quantity
                FROM order_products
                GROUP BY product_id
            ) top_selling
            ON p.id = top_selling.product_id
			ORDER BY top_selling.total_quantity DESC
            LIMIT 5;`
            const conn = await Client.connect();
            const result = await conn.query(sql);
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

}