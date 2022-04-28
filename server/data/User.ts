import { IUser } from "./types";
import { v4 as uuidv4 } from 'uuid';

class User {
  users : Array<IUser> = []
  constructor(){}

  addNew(name: string){
    const existUser = this.users.find((e: IUser) => e.name === name)
    if(existUser === undefined) {
      const user = {
        id: uuidv4(),
        name
      } as IUser
      this.users.push(user)
      return user
    } else {
      throw new Error("User exist")
    }
  }

  
}

const UserDB = new User()

export default UserDB