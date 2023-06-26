import { Controller, textResult, defaultWorker, jsonResult, worker, route, HTTP_STATUS_CODE, HTTP_METHOD, guards, singleton, shields } from 'fortjs';
import { UserService } from '@/services/user_service';
import { ModelUserGuard } from '@/guards/model_user_guard';
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

    @worker(HTTP_METHOD.Post)
    @route("/")
    @guards(ModelUserGuard)
    async addUser() {
        const user = this.data.user;
        const newUser = this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @worker(HTTP_METHOD.Put)
    @guards(ModelUserGuard)
    @route("/")
    async updateUser() {
        const user: User = this.data.user;
        const userUpdated = this.service.updateUser(user);
        if (userUpdated === true) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user");
        }

    }

    @worker(HTTP_METHOD.Get)
    @route("/{id}")
    async getUser() {

        const userId = Number(this.param.id);
        const user = new UserService().getUser(userId);
        if (user == null) {
            return textResult("invalid user id", HTTP_STATUS_CODE.NotFound);
        }
        return jsonResult(user);

    }

    @worker(HTTP_METHOD.Delete)
    @route("/{id}")
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