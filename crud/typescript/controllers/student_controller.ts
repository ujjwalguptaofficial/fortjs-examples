
import { Controller, DefaultWorker, Worker, textResult, viewResult, Singleton, HTTP_METHOD, Route, redirectResult, Guards } from "fortjs";
import { StudentService } from "../services/student_service";
import { Student } from "../models/student";
import { StudentValidatorGuard } from "../guards/student_validator_guard";

export class StudentController extends Controller {

    service: StudentService;

    constructor(@Singleton(StudentService) service) {
        super();
        this.service = service;
    }

    @DefaultWorker()
    async getStudents() {
        const students = this.service.getAllStudents();
        return viewResult("student/index.html", {
            students: students
        });
    }

    @Worker([HTTP_METHOD.Get])
    @Route("/edit/{id}")
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

    @Worker([HTTP_METHOD.Get])
    @Route("/add")
    async getStudentForm() {
        return viewResult("student/add.html");
    }


    @Worker([HTTP_METHOD.Post])
    @Route("/add")
    @Guards([StudentValidatorGuard])
    async addStudent() {
        const student: Student = this.data.student;
        this.service.addStudent(student);
        return redirectResult("/student");
    }

    @Worker([HTTP_METHOD.Post])
    @Route("/update")
    @Guards([StudentValidatorGuard])
    async updateStudent() {
        const student: Student = this.data.student;
        const isUpdated = this.service.updateStudent(student);
        if (isUpdated) {
            return redirectResult("/student");
        }
        else {
            return textResult("Unable to update Student");
        }
    }

    @Worker([HTTP_METHOD.Get])
    @Route("/delete/{id}")
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