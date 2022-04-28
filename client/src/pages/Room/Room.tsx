import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext, useUserContext } from "@hooks"
import "./room.scss";

const RoomContainer = () => {
  const navigate = useNavigate();
  const socketContext = useSocketContext()
  const userContext = useUserContext()

  const [roomName, setRoomName] = useState("")


  const rooms = [
    ...new Array(10).fill(1).map((_, i) => ({
      roomId: i,
      roomName: `Room ${i}`,
    })),
  ];

  const emitCreateRoom = () => {
    socketContext?.emit("create-room", {
      roomName,
      user : userContext?.user
    })
  }

  useEffect(() => {
    socketContext?.on("create-room-feedback", (data) => {
      console.log(data)
    })
  }, [])


  return (
    <div className="room">
      <div className="room__container">
        <div className="room__form">
          <h3 className="room__heading">New Room:</h3>
          <input 
            placeholder="Type room name" 
            value={roomName} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
          />
          <button onClick={emitCreateRoom}>Create</button>
        </div>
        <h3 className="room__heading">All Rooms:</h3>
        <div className="room__list">
          {rooms.map((room) => (
            <div
              className="room__item"
              key={room.roomId}
              onClick={() => navigate(`/room/${room.roomId}`)}
            >
              {room.roomName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomContainer;
