import { DefaultController } from "@/controllers/default_controller";
import { IControllerRoute } from "fortjs";
import { UserController } from "@/controllers/user_controller";

export const routes: IControllerRoute[] = [
    {
        path: "/*",
        controller: DefaultController
    },
    {
        path: "/user",
        controller: UserController
    }
];