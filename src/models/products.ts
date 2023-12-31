// @ts-ignore
import Client from '../database'


export type Product = {
    id?: string;
    name: string;
    price: number;
}
export class productStore {

    async create(theProduct: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [theProduct.name, theProduct.price]);
            const product = result.rows[0];
            conn.release();
            return product
        } catch (err) {
            throw new Error(`Could not add user ${theProduct.name}. Error: ${err}`)
        }
    }

    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get product. Error: ${err}`)
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

}