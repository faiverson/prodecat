
import {UserType} from 'prisma/seeds/enum'

class User {
  username: string;
  type?: UserType = UserType.User;
  email: string;
  phone?: string;
  password: string;

  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;

    if(user.phone) {
      this.phone = user.phone;
    }

    if(user.type) {
      this.type = user.type;
    }
  }
}

export default User
