import React from "react";
import { useNavigate } from "react-router-dom";
import "./room.scss";

const RoomContainer = () => {
  const navigate = useNavigate();

  const rooms = [
    ...new Array(10).fill(1).map((_, i) => ({
      roomId: i,
      roomName: `Room ${i}`,
    })),
  ];

  return (
    <div className="room">
      <div className="room__container">
        <div className="room__form">
          <h3 className="room__heading">New Room:</h3>
          <input placeholder="Type room name" />
          <button>Create</button>
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
