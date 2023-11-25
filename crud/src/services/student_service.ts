import { Student } from "@/models/student";


const students: Student[] = [{
    id: 1,
    city: 'Bangalore',
    country: 'India',
    gender: 'Male',
    name: 'Ujjwal Gupta'
}];

let lastId = 1;
export class StudentService {
    getAllStudents() {
        return students;
    }

    getStudentById(studentId) {
        return students.find(q => q.id === studentId);
    }

    addStudent(student: Student) {
        student.id = ++lastId;
        students.push(student);
    }

    updateStudent(student: Student) {
        student.id = Number(student.id);
        const savedStudent = students.find(q => q.id === student.id);
        if (savedStudent) {
            savedStudent.name = student.name;
            savedStudent.city = student.city;
            savedStudent.country = student.country;
            savedStudent.gender = student.gender;
            return true;
        }
        return false;
    }

    deleteStudentById(studentId) {
        const index = students.findIndex(q => q.id === studentId);
        if (index >= 0) {
            students.splice(index, 1);
            return true;
        }
        return false;
    }
}