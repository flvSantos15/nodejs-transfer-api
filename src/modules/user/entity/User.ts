import crypto from "crypto";

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
    this.id = crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

