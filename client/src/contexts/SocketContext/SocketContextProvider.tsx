import SocketContext from "./SocketContext";
import { ReactChild, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client";

type Props = {
  children : ReactChild
}

function SocketContextProvider({ children } : Props) {

  const [socket] = useState<Socket>(() =>  io("http://localhost:4000"))

  return (
    <SocketContext.Provider value={socket} >
      {
        children
      }
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;