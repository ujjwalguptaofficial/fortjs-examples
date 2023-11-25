import { DefaultController } from "@/controllers/default_controller";
import { ParentRoute } from "fortjs";
import { StudentController } from "@/controllers/student_controller";

export const routes: ParentRoute[] = [
    {
        path: "/*",
        controller: DefaultController
    },
    {
        path: "/student",
        controller: StudentController
    }
];