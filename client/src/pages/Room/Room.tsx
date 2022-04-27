import React from "react";
import "./room.scss";
const Room = () => {
  const rooms = [
    ...new Array(10).fill(1).map((_, i) => ({
      roomId: i,
      roomName: `Room ${i}`,
    })),
  ];
  console.log(rooms);

  return (
    <div className="room">
      <div className="room-container">
        <div className="room-form">
          <h3 className="room-heading">New Room:</h3>
          <input placeholder="Type room name" />
          <button className="btn-create">Create</button>
        </div>
        <h3 className="room-heading">All Rooms:</h3>
        <div className="room-list">
          {rooms.map((room) => (
            <div className="room-item" key={room.roomId}>
              {room.roomName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
