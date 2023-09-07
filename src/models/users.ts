// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt';


export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    password: string;

}
const saltRounds = process.env.SALT_ROUNDS!;
const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {

    async create(theUser: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(theUser.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [theUser.firstName,theUser.lastName ,hash]);
            const user = result.rows[0];
            conn.release();
            return user
        } catch (err) {
            throw new Error(`Could not add user ${theUser.firstName}. Error: ${err}`)
        }
    }

    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get the users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

}