import { Fort, jsonResult, textResult } from "fortjs";
import { createApp } from "@/index";
import { UserController } from "@/controllers/user_controller";
import { UserService } from "@/services/user_service";

describe('UserController', () => {
    const controller = new UserController(new UserService());

    beforeAll(async () => {
        await createApp();
    });

    it('getUsers', async () => {
        controller.initialize();
        const expectedResult = jsonResult(controller.service.getUsers());
        const result = await controller.getUsers();
        expect(result).toEqual(expectedResult);
    });

    it('addUser', async () => {
        const newUser = {
            name: 'ujjwal gupta',
            emailId: 'ujjwal@m.com',
            gender: 'male',
            password: 'asdfvg',
            address: 'Bangalore India'
        };
        controller.initialize();
        const expectedResult = jsonResult(newUser, 201);
        const result = await controller.addUser(newUser);
        expect(result).toEqual(expectedResult);
        expect(result.responseData).toEqual(newUser);
    });


    it('updateUser', async () => {
        const userData = {
            id: 2,
            name: 'ujjwal gupta',
            emailId: 'ujjwal@m.com',
            gender: 'male',
            password: 'asdfvg',
            address: 'Bangalore India'
        };
        // update user for existing data
        controller.initialize();
        let expectedResult = await textResult("user updated");
        let result = await controller.updateUser(userData);
        expect(result).toEqual(expectedResult);

        // update user for not xisting data
        userData.id = 5;
        controller.initialize();
        expectedResult = textResult("invalid user");
        result = await controller.updateUser(userData);
        expect(result).toEqual(expectedResult);
    });

    it('getUser', async () => {

        // get user for existing data
        controller.initialize({
            param: {
                id: '2'
            }
        });
        const savedData = controller.service.getUser(2);
        let expectedResult = jsonResult(savedData);
        let result = await controller.getUser();
        expect(result).toEqual(expectedResult);

        // get user for not xisting data

        controller.initialize({
            param: {
                id: '5'
            }
        });
        expectedResult = textResult("invalid user id", 404);
        result = await controller.getUser();
        expect(result).toEqual(expectedResult);
    });

    it('removeUser', async () => {

        // get user for existing data
        controller.initialize({
            param: {
                id: '2'
            }
        });

        let expectedResult = textResult("user deleted");
        let result = await controller.removeUser();
        expect(result).toEqual(expectedResult);

        // get user for not xisting data

        controller.initialize({
            param: {
                id: '5'
            }
        });
        expectedResult = textResult("invalid user id", 404);
        result = await controller.removeUser();
        expect(result).toEqual(expectedResult);
    });

    afterAll(() => {
        return Fort.destroy();
    });
});