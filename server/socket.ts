import { Server, Socket } from "socket.io";
import { MatchManageDB, RoomDB, UserDB } from "./data";
import { IUser, IRoom, IMatch } from "./data/types";

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

    socket.on("setup-match", ({ roomId, user, roomName } : { roomId : IRoom['id'], user: IUser, roomName: string }) => {
      const match = MatchManageDB.joinMatch(roomId, user, roomName)
      socket.join(roomId)
      console.log(match)
      if(match.isReady){
        io.to(roomId).emit("setup-match-feedback", { status: 'ok', match })
      }
    })

    socket.on('user-attack', ({
      userId, 
      position, 
      matchId
    } : {
      userId : IUser['id'], 
      position : { 
        x: number, 
        y: number
      }, 
      matchId : IMatch['id']
    }) => {
      try {
        const match = MatchManageDB.findMatch(matchId)
        if(match === undefined) throw new Error('Match is not exist')

        match.userAttack(userId, position)
        const prevTurn = match.changeTurnAndGetPrevTurn()

        console.log(match)
        io.to(matchId).emit('user-attack-feedback', {
          status : 'ok',
          color: match.userChess[prevTurn],
          match,
          position
        })

      } catch (error : InstanceType<Error>) {
        console.log(error.message)
        io.to(matchId).emit('user-attack-feedback', {
          status: 'error',
          message: error.message
        })
      }
    })

    // 
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
          const remainUser = deletedRoom.users.find(u => u.id !== user.id)
          io.emit('user-should-out-room', { room: deletedRoom, user: remainUser })
          io.emit('update-rooms', { rooms })
          MatchManageDB.deleteMatch(deletedRoom.id)
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