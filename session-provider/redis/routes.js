import { DefaultController } from "./controllers/default_controller";
import { SessionController } from "./controllers/session_controller";

export const routes = [{
    path: "/*",
    controller: DefaultController
}, {
    path: "/session",
    controller: SessionController
}]