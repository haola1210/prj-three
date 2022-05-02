import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import type { RoomProps } from './types';

import { useUserContext } from '@hooks';


import './Room.scss'
function Room({ room :  { id, name, users } }: RoomProps) {
  const [nOUser, setNOUser] = useState(users.length)
  const userCtx = useUserContext()
  const navigate = useNavigate()

  // useEffect(() => {
  //   const isOwner = users[0].id === userCtx?.user.id
  //   if(isOwner){
  //     navigate(`/room/${id}`)
  //   }
  // }, [])

  return (
    <div className='room-item'>
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