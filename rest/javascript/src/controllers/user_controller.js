import { Controller, textResult, jsonResult, HTTP_STATUS_CODE, singleton, http, asBody, validate } from 'fortjs';
import { UserService } from '@/services/user_service';
import { User } from '@/models/user';

export class UserController extends Controller {

    constructor(@singleton(UserService) service) {
        super();
        this.service = service;
    }

    @http.get("/")
    async getUsers() {
        return jsonResult(this.service.getUsers());
    }

    @http.post("/")
    @validate.body(User)
    async addUser(@asBody user) {
        const newUser = this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @validate.body(User)
    @http.put("/")
    async updateUser(@asBody user) {
        const userUpdated = this.service.updateUser(user);
        if (userUpdated === true) {
            return textResult("user updated");
        } else {
            return textResult("invalid user");
        }

    }

    @http.get("/{id}")
    async getUser() {
        const userId = Number(this.param.id);
        const user = this.service.getUser(userId);
        if (user == null) {
            return textResult("invalid user id", 404);
        }
        return jsonResult(user);

    }

    @http.delete("/")
    async removeByQueryString(@singleton(UserService) service) {
        // taking id from query string
        const userId = Number(this.query.id);
        const user = service.getUser(userId);
        if (user != null) {
            service.removeUser(userId);
            return textResult("user deleted");
        }
        else {
            return textResult("invalid user", 404);
        }
    }

    @http.delete("/{id}")
    async removeUser() {

        const userId = Number(this.param.id);
        const user = this.service.getUser(userId);
        if (user != null) {
            this.service.removeUser(userId);
            return textResult("user deleted");
        } else {
            return textResult("invalid user id", 404);
        }
    }

}