import { User } from '@/models/user';
export class UserService {

    async findAll() {
        const users = await User.findAll();
        return users;
    }

}