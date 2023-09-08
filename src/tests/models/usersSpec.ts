import { User, UserStore } from "../../models/users";
// @ts-ignore
import Client from '../../database'

const store = new UserStore();

describe('Test for users model', () => {

    afterAll(async () => {
        const sql = `DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; 
                    DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; 
                    DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; 
                    DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;`
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })

    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    })

    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    })

    it('should create a new user', async () => {
        const user: User = {
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
        };

        const result = await store.create(user);
        expect(result).toEqual(jasmine.objectContaining({
            first_name: 'John',
            last_name: 'Doe',
        }))
    });

    it('should show user with userId=1', async ()=> {
        const id = '1';
        const result = await store.show(id);
        expect(result).toEqual(jasmine.objectContaining({
            first_name: 'John',
            last_name: 'Doe',
        }))
    })



});

