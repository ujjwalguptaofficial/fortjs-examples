import { userSchema } from "../db_schemas/user";

export class UserService {
    async addUser(user) {
        const userObj = new userSchema(user);
        return await userObj.save();
    }

    async getUserById(id) {
        const user = await userSchema.findById(id);
        return user;
    }

    async getAllUsers() {
        const users = await userSchema.find();
        return users;
    }

    async removeUserById(id) {
        return await userSchema.deleteOne({ _id: id });
    }

    async updateUser(user) {
        const updateUser = await userSchema.updateOne({ _id: user._id }, {
            name: user.name,
            gender: user.gender,
            emailId: user.emailId,
            address: user.address
        });
        return updateUser;
    }
}