import { Schema, model } from "mongoose";
import { IUser } from "@/interfaces/user";

const schemaObj = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
    emailId: { type: String, required: true },
    password: { type: String }

});

export const UserSchema = model<IUser>('User', schemaObj);