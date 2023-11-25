export class Student {
    id?: number;
    name: string;
    gender: string;
    country: string;
    city: string;

    constructor(data: Student) {
        this.id = Number(data.id);
        this.name = data.name;
        this.gender = data.gender;
        this.country = data.country;
        this.city = data.city;
    }
}