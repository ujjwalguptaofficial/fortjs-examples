import { Length, Contains, IsIn, IsEmail } from "class-validator";

export class User {
    _id?: string;

    @Length(5)
    password?: string;

    @Length(5)
    name: string;

    @IsIn(["male", "female"])
    gender: string;

    @Length(10, 100)
    address: string;

    @IsEmail()
    emailId: string;

    init(user: any) {
        this._id = user._id;
        this.name = user.name;
        this.gender = user.gender;
        this.address = user.address;
        this.emailId = user.emailId;
        this.password = user.password;
        return this;
    }
}