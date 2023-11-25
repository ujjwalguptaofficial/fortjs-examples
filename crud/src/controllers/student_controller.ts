
import { Controller, textResult, viewResult, singleton, HTTP_METHOD, redirectResult, http, validate } from "fortjs";
import { StudentService } from "@/services/student_service";
import { Student } from "@/models/student";

export class StudentController extends Controller {

    service: StudentService;

    constructor(@singleton(StudentService) service) {
        super();
        this.service = service;
    }

    @http.get("/")
    async getStudents() {
        const students = this.service.getAllStudents();
        return viewResult("student/index.html", {
            students: students
        });
    }

    @http.get("/edit/{id}")
    async editStudent() {
        const studentId = Number(this.param.id);
        const student = this.service.getStudentById(studentId);
        if (student) {
            this.logger.log('student', student);
            return viewResult("student/edit.html", {
                student: student
            });
        }
        else {
            return textResult("Invalid studentId")
        }
    }

    @http.get("/add")
    async getStudentForm() {
        return viewResult("student/add.html");
    }


    @http.post("/add")
    @validate.body(Student)
    async addStudent() {
        const student: Student = this.body as Student;
        this.service.addStudent(student);
        return redirectResult("/student");
    }

    @http.post("/update")
    @validate.body(Student)
    async updateStudent() {
        const student: Student = this.body as Student;
        const isUpdated = this.service.updateStudent(student);
        if (isUpdated) {
            return redirectResult("/student");
        }
        else {
            return textResult("Unable to update Student");
        }
    }

    @http.get("/delete/{id}")
    async deleteStudent() {
        const studentId = Number(this.param.id);
        const student = this.service.getStudentById(studentId);
        if (student) {
            this.logger.log('student', student);
            this.service.deleteStudentById(studentId);
            return redirectResult("/student");
        }
        else {
            return textResult("Invalid studentId")
        }
    }
}