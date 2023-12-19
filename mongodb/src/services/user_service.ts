import { UserSchema } from "@/db_schemas/user";
import { User } from "@/models/user";

export class UserService {
    async addUser(user: User) {
        const userObj = new UserSchema(user);
        return await userObj.save();
    }

    async getUserById(id: string) {
        const user = await UserSchema.findById(id);
        return user;
    }

    async getAllUsers() {
        const users = await UserSchema.find();
        return users;
    }

    async removeUserById(id: string) {
        return await UserSchema.deleteOne({ _id: id });
    }

    async updateUser(user: User) {
        const updateUser = await UserSchema.updateOne({ _id: user._id }, {
            name: user.name,
            gender: user.gender,
            emailId: user.emailId,
            address: user.address
        });
        return updateUser;
    }
}