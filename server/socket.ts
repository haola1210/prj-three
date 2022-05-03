import { Server, Socket } from "socket.io";
import { RoomDB, UserDB } from "./data";
import { IUser, IRoom } from "./data/types";

function socketController(io : Server){
  const MapSocketUser : Record<string, IUser> = {}
  io.on("connection", (socket: Socket) => {
    console.log(socket.id)

    socket.on('user-naming', ({ user } : { user: IUser }) => {
      MapSocketUser[socket.id] = user
    })

    socket.on("create-room", ({ roomName, user } : { roomName: string, user : IUser }) => {
      try {
        const room = RoomDB.addNew(roomName, user)
        io.emit("create-room-feedback", { status: 'ok', room })
      } catch (error : InstanceType<Error>) {
        socket.emit("create-room-feedback", { status : 'error', message: error.message })
      }
    })

    socket.on('user-join-room', ({ user, roomId } : { user: IUser, roomId: IRoom['id'] }) => {
      try {
        const room = RoomDB.joinRoom(user, roomId)
        io.emit("user-join-room-feedback", { status :'ok', room, user })
      } catch (error : InstanceType<Error>) {
        socket.emit("user-join-room-feedback", { status: 'error', message: error.message })
      }
    })

    socket.on('user-out-room', ({ user, room } : { user: IUser, room : IRoom }) => {
      /**
       // user out room ->  delete room -> broadcast to all user -> 
       // if remain anyone in that room -> navigate them out ->
       // and broadcast to all user about new room list
       */
      console.log(`user: ${user.name} out room of ${room.users[0].name} & ${room.users[1].name}`)
      const rooms = RoomDB.deleteOne(room.id)
      const remainUser = room.users.find(u => u.id !== user.id)
      io.emit('user-should-out-room', { room, user: remainUser })
      io.emit('update-rooms', { rooms })
    })

    socket.on('disconnect', async () => {
      /**
       * user terminate -> delete all room contain user -> 
       * broadcast to all user about new room list
       * if remain anyone in room -> navigate them out
       */
      const user = MapSocketUser[socket.id]
      if(user){
        console.log('user terminate')
        delete MapSocketUser[socket.id]
        
        const [users, result] = await Promise.all([
          deleteOneUser(user.id),
          deleteAllRoomContainUser(user.id) 
        ])
        
        const { deletedRoom, rooms } = result
        if(deletedRoom){
          console.log(users, deletedRoom, rooms)
          const remainUser = deletedRoom.users.find(u => u.id !== user.id)
          io.emit('user-should-out-room', { room: deletedRoom, user: remainUser })
          io.emit('update-rooms', { rooms })
        }
      }
    })

  })
}

const deleteOneUser = (userId : IUser['id']) => new Promise((res , _) => {
  const users = UserDB.deleteOne(userId)
  res(users)
})
const deleteAllRoomContainUser = (userId : IUser['id']) => new Promise<{ deletedRoom: IRoom | undefined, rooms: IRoom[] }>((res, rej) => {
  const result = RoomDB.deleteRoomContainUser(userId)
  res(result)
})

export default socketController