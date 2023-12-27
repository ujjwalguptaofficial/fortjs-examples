import { Controller, http, jsonResult, singleton } from 'fortjs';
import { UserService } from '@/services/user_service';

export class UserController extends Controller {

    userService: UserService;

    constructor(@singleton(UserService) userService) {
        super();
        this.userService = userService;
    }

    @http.get("/")
    async getAllUsers() {
        const users = await this.userService.findAll();
        return jsonResult(users);
    }
}