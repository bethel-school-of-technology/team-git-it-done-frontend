export class User {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  username?: string; // There is no username in the backend. Should it be removed?
  img?: string;

  constructor(
    id?: number,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    img?: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.img = img;
  }
}
