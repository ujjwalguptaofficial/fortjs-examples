import { UserService } from "@/services/user_service";
import { Controller, HTTP_STATUS_CODE, http, singleton, textResult, viewResult } from "fortjs";

export class AuthController extends Controller {

    @http.get("/login")
    async getLoginForm() {
        return viewResult("../src/views/default/login.html");
    }

    @http.post("/login")
    async doLogin(@singleton(UserService) service) {
        const email = this.body.email;
        const password = this.body.password;
        const userFromService = service.getUserByEmailAndPassword(email, password);
        if (userFromService != null) {
            this.session.set('email', email);
            return textResult(`Welcome ${userFromService.name}`);
        }
        else {
            return textResult("invalid Login Data", HTTP_STATUS_CODE.BadRequest);
        }
    }
}
