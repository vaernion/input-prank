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

  static validatePassword(user: User) {
    return user.password.length >= 5;
  }
}
