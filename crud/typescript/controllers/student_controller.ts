
import { Controller, DefaultWorker, Worker, textResult, viewResult, Singleton, HTTP_METHOD, Route, redirectResult } from "fortjs";
import { StudentService } from "../services/student_service";
import { Student } from "../models/student";

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
    async addStudent() {
        const student: Student = {
            name: this.body.name,
            city: this.body.city,
            country: this.body.country,
            gender: this.body.gender
        };
        this.service.addStudent(student);
        return redirectResult("/student");
    }

    @Worker([HTTP_METHOD.Post])
    @Route("/update")
    async updateStudent() {
        const student: Student = {
            id: this.body.id,
            name: this.body.name,
            city: this.body.city,
            country: this.body.country,
            gender: this.body.gender
        };
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