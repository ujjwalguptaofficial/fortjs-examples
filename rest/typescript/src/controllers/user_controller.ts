import { Controller, textResult, jsonResult, HTTP_STATUS_CODE, singleton, http, validate, asBody } from 'fortjs';
import { UserService } from '@/services/user_service';
import { User } from '@/models/user';

export class UserController extends Controller {

    service: UserService;
    constructor(@singleton(UserService) service: UserService) {
        super();
        this.service = service;
    }

    @http.get("/")
    async getUsers() {
        return jsonResult(this.service.getUsers());
    }

    @validate.body(User)
    @http.post("/")
    async addUser(@asBody user: User) {
        const newUser = this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @validate.body(User)
    @http.put("/")
    async updateUser(@asBody user: User) {
        const userUpdated = this.service.updateUser(user);
        if (userUpdated === true) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user");
        }
    }

    @http.get("/{id}")
    async getUser() {
        const userId = Number(this.param.id);
        const user = new UserService().getUser(userId);
        if (user == null) {
            return textResult("invalid user id", HTTP_STATUS_CODE.NotFound);
        }
        return jsonResult(user);

    }

    @http.delete("/{id}")
    async removeUser() {
        const userId = Number(this.param.id);
        const user = this.service.getUser(userId);
        if (user != null) {
            this.service.removeUser(userId);
            return textResult("user deleted");
        }
        else {
            return textResult("invalid user id", 404);
        }
    }

}