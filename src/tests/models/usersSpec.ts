import { User, UserStore } from "../../models/users";


const store = new UserStore();

describe('Test for users model', () => {

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

