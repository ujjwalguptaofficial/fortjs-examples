import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    name: string;
    address: string;
    gender: string;
    emailId: string;
    password?: string;
}