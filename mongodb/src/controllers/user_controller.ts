import { Controller, textResult, jsonResult, http, HTTP_STATUS_CODE, singleton, validate } from 'fortjs';
import { UserService } from '@/services/user_service';
import { User } from '@/models/user';

export class UserController extends Controller {

    service: UserService;

    constructor(@singleton(UserService) service) {
        super();
        this.service = service;
    }

    @http.get("/")
    async getUsers() {
        const users = await this.service.getAllUsers();
        this.logger.log(users);
        return jsonResult(users);
    }

    @http.post("/")
    @validate.body(User)
    async addUser() {
        const user = this.data.user;
        const newUser = await this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @http.put("/")
    @validate.body(User)
    async updateUser() {
        const user: User = this.data.user;
        const result = await this.service.updateUser(user);
        if (result.modifiedCount > 0) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user", 400);
        }
    }

    @http.get("/{id}")
    async getUser() {
        const userId = this.param.id;
        const user = await this.service.getUserById(userId);
        if (user == null) {
            return textResult("invalid id");
        }
        return jsonResult(user);

    }

    @http.delete("/{id}")
    async removeUser() {
        const userId = this.param.id;
        const user = await this.service.removeUserById(userId);
        if (user.deletedCount > 0) {
            return textResult("user deleted");
        }
        else {
            return textResult("invalid user");
        }
    }
}