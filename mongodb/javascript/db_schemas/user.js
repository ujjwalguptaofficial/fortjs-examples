import { Schema, model } from "mongoose";

const schemaObj = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
    emailId: { type: String, required: true },
    password: { type: String }

});

export const userSchema = model('User', schemaObj);