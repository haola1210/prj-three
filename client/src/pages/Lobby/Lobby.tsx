import { useSocketContext, useUserContext } from '@hooks';
import { IRoom, IMatchPrimary } from '@/types';
import Controls from '@components/3Ds/Controls';
import { Box } from '@components/3Ds/Cube';
import { Canvas } from '@react-three/fiber';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CountDown from '@components/CountDown';

import "./Lobby.scss"
function Lobby() {
  const { id } = useParams()
  const [room, setRoom] = useState<null | IRoom>(null)
  const socket = useSocketContext()
  const userCtx = useUserContext()
  const roomRef = useRef<IRoom | null>(null)
  const navigate = useNavigate()
  const [match, setMatch] = useState<IMatchPrimary | null>(null)
  const isGameStart = useRef(false)

  const startGame = () => {
    isGameStart.current = true
  }

  const userOutRoom = () => {
    console.log("emit here")
    if(roomRef.current && !isGameStart){
      socket?.emit("user-out-room", { user: userCtx?.user, room: roomRef.current })
    }
  }

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

  useEffect(() => {
    socket?.on('user-join-room-feedback', (data) => {
      if(data.status === 'ok' && data.room.id === roomRef.current?.id){
        setRoom(data.room)
      } else {
        console.log(data.messgae)
      }
    })

    return () => {
      userOutRoom()
    }
  }, [])

  useEffect(() => {
    socket?.on('user-should-out-room', data => {
      if(data.room.id === roomRef.current?.id && data.user.id === userCtx?.user.id){
        navigate('/rooms')
      }
    })
  }, [])

  useEffect(() => {
    roomRef.current = room
  }, [room])

  useEffect(() => {
    if(room && room.users.length === 2){
      socket?.emit("setup-match", { 
        roomId : room.id,  
        roomName : room.name,
        user : userCtx?.user
      })
    }
  }, [room])

  useEffect(() => {
    socket?.on("setup-match-feedback", data => {
      setMatch(data.match)
    })
  }, [])

  return (
    <div className='lobby'>
      <h1 className='lobby__title'>Welcome to room: {room?.name}!</h1>
      {
        room && room?.users.length === 1 && 
        <div className='lobby__status'>Waiting for opponent...</div>
      }
      <div className='lobby__count-down'>{
        match?.isReady && <div className='lobby__status'>
            Your opponent is ready, game will start after: {" "}
            <CountDown matchId={match.id} setGameStatus={startGame}/>
          </div>
      }</div>
      <div className='lobby__description'> 
        Your chess: 
        <Canvas className='user-chess-point'>
          { 
            userCtx && room && room.users.length === 2 && 
            match && match.isReady &&
            <>
              <Box color={match.userChess[userCtx.user.id]} size={[1, 1, 1]} rotate={true} />
              <Controls />
            </>
          }
        </Canvas>
      </div>
    </div>
  );
}

export default Lobby;