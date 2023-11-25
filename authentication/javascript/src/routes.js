import { DefaultController } from "@/controllers/default_controller";
import { UserController } from "@/controllers/user_controller";
import { AuthController } from "@/controllers/auth_controller";

export const routes = [
    {
        path: "/*",
        controller: DefaultController
    },
    {
        path: "/auth",
        controller: AuthController
    },
    {
        path: "/user",
        controller: UserController
    }
];