import { Server, Socket } from "socket.io";

function socketController(io : Server){
  io.on("connection", (socket: Socket) => {
    console.log(socket.id)
  })
}

export default socketController