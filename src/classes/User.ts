import { difficulty } from "../data/settings";

export class User {
  static count: number = 0;
  id: number;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.id = ++User.count;
    this.username = username;
    this.password = password;
  }

  static isPasswordvalid(password: string) {
    return password.length >= difficulty.minPasswordLength;
  }
  static isUsernameValid(username: string) {
    return username.length >= difficulty.minUsernameLength;
  }
}
