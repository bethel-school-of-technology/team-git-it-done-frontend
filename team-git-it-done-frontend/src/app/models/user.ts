export class User {

    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    username?: string;

    constructor(id?: number, email?: string, password?: string, firstName?: string, lastName?: string, username?: string,) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;

    }
}