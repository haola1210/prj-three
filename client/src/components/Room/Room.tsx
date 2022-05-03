import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import type { RoomProps } from './types';

import { useSocketContext, useUserContext } from '@hooks';


import './Room.scss'
function Room({ room :  { id, name, users } }: RoomProps) {
  const [nOUser, setNOUser] = useState(users.length)
  const userCtx = useUserContext()
  const socket = useSocketContext()
  const navigate = useNavigate()

  const handleJoinRoom = () => {
    if(nOUser < 2){
      socket?.emit("user-join-room", { 
        user: userCtx?.user,
        roomId: id
      })
    } else {
      console.log("room is fulled")
    }
  }

  useEffect(() => {
    socket?.on('user-join-room-feedback', (data) => {
      if(data.status === 'ok'){
        if(data.room.id === id){
          setNOUser(data.room.users.length)
          if(data.user.id === userCtx?.user.id){
            navigate(`/room/${id}`)
          }
        }
      } else {
        console.log(data.message)
      }
    })
  }, [])

  return (
    <div className={`room-item ${nOUser < 2 ? `room-item--active` : `room-item--disable`}`} onClick={handleJoinRoom}>
      <div className='room-item__name'>
        { name }
      </div>
      <div className='room-item__no-user'>
        { nOUser }/2
      </div>
    </div>
  );
}

export default Room;