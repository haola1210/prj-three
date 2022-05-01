import { Server, Socket } from "socket.io";
import { RoomDB } from "./data";
import { IUser } from "./data/types";

function socketController(io : Server){
  io.on("connection", (socket: Socket) => {
    console.log(socket.id)

    socket.on("create-room", ({ roomName, user } : { roomName: string, user : IUser }) => {
      try {
        const room = RoomDB.addNew(roomName, user)
        io.emit("create-room-feedback", { status: 'ok', room })
      } catch (error : InstanceType<Error>) {
        socket.emit("create-room-feedback", { status : 'error', message: error.message })
      }
    })
  })
}

export default socketController