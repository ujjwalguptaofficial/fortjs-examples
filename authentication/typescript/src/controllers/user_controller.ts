import { Controller, textResult, defaultWorker, jsonResult, HTTP_STATUS_CODE, singleton, shields, validate, http, asBody } from 'fortjs';
import { UserService } from '@/services/user_service';
import { User } from '@/models/user';
import { AuthenticationShield } from '@/shields/authentication_shield';

@shields(AuthenticationShield)
export class UserController extends Controller {

    service: UserService;
    constructor(@singleton(UserService) service: UserService) {
        super();
        this.service = service;
    }

    @defaultWorker()
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