 
export class User {
    init(user) {
        this._id = user._id;
        this.name = user.name;
        this.gender = user.gender;
        this.address = user.address;
        this.emailId = user.emailId;
        this.password = user.password;
        return this;
    }
}