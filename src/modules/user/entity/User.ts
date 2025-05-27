import { v4 as uuidv4 } from "uuid";

export type TUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};

export class User implements TUser {
  id: string;
  name: string;
  email: string;
  password?: string;

  constructor({ name, email, password }: TUser) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

