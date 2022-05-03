import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext, useUserContext } from "@hooks"
import "./room.scss";
import axios, { AxiosResponse } from "axios";
import Room from "@components/Room";
import { IRoom } from "@/types";



const RoomContainer = () => {
  const navigate = useNavigate();
  const socketContext = useSocketContext()
  const userContext = useUserContext()

  const [roomName, setRoomName] = useState("")
  const lastCreatedRoom = useRef<null | IRoom>(null)


  const [rooms, setRooms] = useState<Array<IRoom>>([])

  const emitCreateRoom = () => {
    socketContext?.emit("create-room", {
      roomName,
      user : userContext?.user
    })
  }

  useEffect(() => {
    axios.get('/api/rooms')
    .then(({ data } : AxiosResponse)=> {
      console.log(data)
      setRooms(data.rooms)
    })
    .catch((error : InstanceType<typeof Error>) => {
      console.log(error.message)
    })
  }, [])

  useEffect(() => {
    socketContext?.on("create-room-feedback", (data) => {
      console.log(data)
      if(data.status === 'ok'){
        if(userContext && userContext.user && userContext?.user.id === data.room.users[0].id){
          // navigate(`/room/${data.room.id}`)
          lastCreatedRoom.current = data.room
        }
        setRooms(prevs => [...prevs, data.room])
      } else {
        console.log(data.message)
      }
    })

    socketContext?.on('update-rooms', data => {
      setRooms(prev => data.rooms)
    })
  }, [])

  useEffect(() => {
    if(lastCreatedRoom && lastCreatedRoom.current){
      navigate(`/room/${lastCreatedRoom.current.id}`)
    }
  }, [rooms])

  return (
    <div className="room">
      <div className="room__container">
        <div className="room__heading">Hi {userContext?.user.name}</div>
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
              key={ room.id }
            >
              <Room
                room={room}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomContainer;
