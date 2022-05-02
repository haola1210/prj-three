import { IRoom } from '@/types';
import Controls from '@components/3Ds/Controls';
import { Box } from '@components/3Ds/Cube';
import { Canvas } from '@react-three/fiber';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "./Lobby.scss"
function Lobby() {
  const { id } = useParams()
  const [room, setRoom] = useState<null | IRoom>(null)

  useEffect(() => {
    axios.get(`/api/room/${id}`)
    .then(({ data } : AxiosResponse) => {
      if(data.status === 'ok'){
        setRoom(data.room)
      } else {
        console.log(data.message)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div className='lobby'>
      <h1 className='lobby__title'>Welcome to room: {room?.name}!</h1>
      {
        room && room?.users.length === 1 && 
        <div className='lobby__status'>Waiting for opponent...</div>
      }
      <div className='lobby__count-down'></div>
      <div className='lobby__description'> 
        Your chess: 
        <Canvas className='user-chess-point'>
          <Controls />
          <Box color="red" size={[1, 1, 1]} />
        </Canvas>
      </div>
    </div>
  );
}

export default Lobby;