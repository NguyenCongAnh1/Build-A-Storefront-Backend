
import { ordersStore } from "../../models/orders";
import { productStore } from "../../models/products";
import { UserStore } from "../../models/users";


const orderStore = new ordersStore();
const userStore = new UserStore();
const ProductStore = new productStore();




describe('Test for order model', () => {

    beforeAll(async () => {
        await userStore.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
        });

        await ProductStore.create({
            name: 'product1',
            price: 9.99
        });

        await orderStore.create({
            productId: '1',
            quantity: 10,
            userId: '1',
            status: 'active'

        });

        await orderStore.create({
            productId: '1',
            quantity: 20,
            userId: '1',
            status: 'complete'

        });
    });

    it('should have an method to get current orders by user', () => {
        expect(orderStore.currentOrderByUser).toBeDefined();
    });

    it('should have an method to get completed orders by user', () => {
        expect(orderStore.completedOrdersByUser).toBeDefined();
    });

    it('should have an create method', () => {
        expect(orderStore.create).toBeDefined();
    });


    it('should create a new order', async () => {
        const result = await orderStore.create({
            productId: '1',
            quantity: 20,
            userId: '1',
            status: 'complete'

        });
        expect(result).toEqual(jasmine.objectContaining({
            product_id: '1',
            quantity: 20,
            user_id: '1',
            status: 'complete'
        }))
    });

    it('should get completed order with user_id=1', async () => {
        const result = await orderStore.completedOrdersByUser('1');
        expect(result).toEqual(jasmine.arrayContaining([jasmine.objectContaining({
            product_id: '1',
            quantity: 20,
            user_id: '1',
            status: 'complete'
        })]));
    });

    it('should get current order with user_id=1', async () => {
        const result = await orderStore.currentOrderByUser('1');
        expect(result).toEqual(jasmine.arrayContaining([jasmine.objectContaining({
            product_id: '1',
            quantity: 10,
            user_id: '1',
            status: 'active'
        })]));
    });

})