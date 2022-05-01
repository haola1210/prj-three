import { IRoom, IUser } from "./types";
import { v4 as uuidv4 } from 'uuid';

class Room {
  private rooms : Array<IRoom> = []
  constructor(){}

  addNew(name: string, owner: IUser){
    const existRoom = this.rooms.find(room => room.name === name)
    if(existRoom === undefined){
      const room = {
        id: uuidv4(),
        name,
        users: [owner]
      } as IRoom
      this.rooms.push(room)
      return room
    } else {
      throw new Error("Name of room is exist")
    }
  }

  joinRoom(user: IUser, roomId: IRoom['id']){
    const room = this.rooms.find(r => r.id === roomId)
    if(room){
      if(room.users.length < 2){
        room.users.push(user)
      } else {
        throw new Error("Room is fulled")
      }
    } else {
      throw new Error("Room is not exist")
    }
  }

  getAllRooms(){
    return this.rooms
  }

}

const RoomDB = new Room()

export default RoomDB