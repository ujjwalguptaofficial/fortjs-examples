import { DefaultController } from "./controllers/default_controller";
import { StudentController } from "./controllers/student_controller";

export const routes = [{
    path: "/*",
    controller: DefaultController
}, {
    path: "/student",
    controller: StudentController
}]