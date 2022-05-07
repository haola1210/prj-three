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
        return room
      } else {
        throw new Error("Room is fulled")
      }
    } else {
      throw new Error("Room is not exist")
    }
  }

  deleteOne(id: string){
    this.rooms = this.rooms.filter(r => r.id !== id)
    return this.rooms
  }

  getAllRooms(){
    return this.rooms
  }

  getOneRoom(id: string){
    const room = this.rooms.find(r => r.id === id)
    if(room){
      return room
    } else {
      throw new Error('room is not exist')
    }
  }

  deleteRoomContainUser(userId : IUser['id']){
    let room : IRoom | undefined
    const rooms = this.rooms.filter(r => {
      if(!(
        (r.users[0] && r.users[0].id === userId) 
        || 
        (r.users[1] && r.users[1].id === userId)
      )){
        return r
      } else {
        room = r
      }
    })
    this.rooms = rooms
    return { deletedRoom: room, rooms: this.rooms }
  }

}

const RoomDB = new Room()

export default RoomDB