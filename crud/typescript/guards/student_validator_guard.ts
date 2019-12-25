
import { Guard, textResult, HTTP_STATUS_CODE } from "fortjs";
import { Student } from "../models/student";
import { isLength, isIn } from "validator";

export class StudentValidatorGuard extends Guard {

    validate(student: Student) {
        let errMessage;
        if (student.name == null || !isLength(student.name, 5)) {
            errMessage = "name should be minimum 5 characters"
        } else if (student.gender == null || !isIn(student.gender, ["male", "female"])) {
            errMessage = "gender should be either male or female";
        } else if (student.country == null || !isLength(student.country, 1)) {
            errMessage = "country is required";
        } else if (student.city == null || !isLength(student.city, 1)) {
            errMessage = "city is required";
        }
        return errMessage;
    }

    async check() {
        const student: Student = {
            id: this.body.id,
            name: this.body.name,
            city: this.body.city,
            country: this.body.country,
            gender: this.body.gender
        };

        const errMsg = this.validate(student);
        if (errMsg == null) {
            // pass student to worker method, so that they dont need to parse again
            this.data.student = student;
            // returning null means - this guard allows request to pass
            return null;
        } else {
            return textResult(errMsg, HTTP_STATUS_CODE.BadRequest);
        }
    }
}