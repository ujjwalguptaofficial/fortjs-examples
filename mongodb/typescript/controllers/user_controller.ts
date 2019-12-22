import { Controller, textResult, DefaultWorker, jsonResult, Worker, Route, HTTP_STATUS_CODE, HTTP_METHOD, Guards, Singleton } from 'fortjs';
import { UserService } from '../services/user_service';
import { UserValidationGuard } from '../guards/user_validation_guard';
import { User } from '../models/user';

export class UserController extends Controller {

    service: UserService;

    constructor(@Singleton(UserService) service) {
        super();
        this.service = service;
    }

    @DefaultWorker()
    async getUsers() {
        const users = await this.service.getAllUsers();
        this.logger.log(users);
        return jsonResult(users);
    }

    @Worker([HTTP_METHOD.Post])
    @Route("/")
    @Guards([UserValidationGuard])
    async addUser() {
        const user = this.data.user;
        const newUser = await this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @Worker([HTTP_METHOD.Put])
    @Guards([UserValidationGuard])
    @Route("/")
    async updateUser() {
        const user: User = this.data.user;
        const result = await this.service.updateUser(user);
        if (result.n > 0) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user", 400);
        }
    }

    @Worker([HTTP_METHOD.Get])
    @Route("/{id}")
    async getUser() {
        const userId = this.param.id;
        const user = await this.service.getUserById(userId);
        if (user == null) {
            return textResult("invalid id");
        }
        return jsonResult(user);

    }

    @Worker([HTTP_METHOD.Delete])
    @Route("/{id}")
    async removeUser() {
        const userId = this.param.id;
        const user = await this.service.removeUserById(userId);
        if (user.n > 0) {
            return textResult("user deleted");
        }
        else {
            return textResult("invalid user");
        }
    }
}