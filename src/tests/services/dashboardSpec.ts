import { ordersStore } from "../../models/orders";
import { productStore } from "../../models/products";
import { UserStore } from "../../models/users";
import { DashboardQueries } from "../../services/dashboard";
// @ts-ignore
import Client from '../../database'

const dashboard = new DashboardQueries();
const ProductStore = new productStore();
const userStore = new UserStore();
const orderStore = new ordersStore();


describe('Test for dashboard', () => {
    beforeAll(async() => {
        await ProductStore.create({
            name: 'product1',
            price: 9.99
        });

        await ProductStore.create({
            name: 'product2',
            price: 19.99
        });

        await ProductStore.create({
            name: 'product3',
            price: 29.99
        });
        await ProductStore.create({
            name: 'product4',
            price: 7.99
        });
        await ProductStore.create({
            name: 'product5',
            price: 5.99
        });

        await userStore.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
        });


        await orderStore.create({
            userId: '1',
            status: 'complete'

        })

        
        await orderStore.create({
            userId: '1',
            status: 'complete'

        })

        await orderStore.create({
            userId: '1',
            status: 'active'

        })

        await orderStore.create({
            userId: '1',
            status: 'complete'

        })
        await orderStore.create({
            userId: '1',
            status: 'complete'

        })

        await orderStore.addProduct(20, '1','1');
        await orderStore.addProduct(50, '1','2');
        await orderStore.addProduct(100, '1','3');
        await orderStore.addProduct(45, '1','4');
        await orderStore.addProduct(200, '1','5');
    })

    afterAll(async () => {
        const sql =`DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; 
                    DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; 
                    DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; 
                    DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;`
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })

    it('should have a method to get five most popular products', () => {
        expect(dashboard.fiveMostPopularProducts).toBeDefined();
    })

    it('should return five most popular products', async ()=> {
        const result = await dashboard.fiveMostPopularProducts();
        expect(result).toHaveSize(5);
        expect(result[0]).toEqual(jasmine.objectContaining({
            name: 'product5', 
            price: '5.99', 
            total_quantity: '200' 
        }));
    })

})