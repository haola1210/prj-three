import { Canvas } from '@react-three/fiber';
import Cube from '@components/3Ds/Cube';
import Controls from '@components/3Ds/Controls';
import Camera from '@components/3Ds/Camera';

import "./Match.scss"
import Board from '@components/3Ds/Board';
import { CSSProperties, Suspense, useEffect, useRef, useState } from 'react';
import Loading from '@components/Loading';
import { IMatchPrimary, IUser } from '@/types';
import FullScreenContainer from '@components/FullScreen';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useMatchContext, useSocketContext, useUserContext } from '@/hooks';
import { MatchContext } from '@contexts/MatchContext';
import { UserContext } from '@contexts/UserContext';
import { SocketContext } from '@contexts/SocketContext';

const style : CSSProperties = {
  position : "absolute",
  top: 0,
  left: 0,
  backgroundColor: '#abababc7'
}

const setTurn = (
  match : IMatchPrimary, 
  user: IUser, 
  set: React.Dispatch<React.SetStateAction<boolean>>) => {
    set(match.currentTurn === user.id)
}

function Match() {
  const [matchExist, setMatchExist] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const userCtx = useUserContext()
  const socket = useSocketContext()
  const [isMyTurn, setMyTurn] = useState(false)
  const match = useMatchContext()

  useEffect(() => {
    axios.get(`/api/match/${id}`)
    .then(({ data } : AxiosResponse) => {
      if(data.status === 'error'){
        navigate('/rooms')
      } else {
        console.log(data.match)
        match.current = data.match
        if(match && match.current && userCtx){
          setTurn(match.current, userCtx?.user, setMyTurn)
        }
        setMatchExist(true)
      }
    })
  }, [])

  useEffect(() => {
    socket?.on('user-attack-feedback', data => {
      if(data.status === 'ok'){
        match.current = data.match
        if(match && match.current && userCtx){
          setTurn(match.current, userCtx?.user, setMyTurn)
        }
      }
    })
  }, [])

  return (
    <div className='Match' style={{ position: 'relative' }}>
      <Canvas>
        <SocketContext.Provider value={socket}>
          <UserContext.Provider value={userCtx}>
            <MatchContext.Provider value={match}>

              <Camera position={[0, 0, 15]} />
              <Controls />
              <Suspense fallback={<Loading />}>
                <Board size={10} color1={"white"} color2={"black"} pad={0.1} />
              </Suspense>
            
            </MatchContext.Provider>
          </UserContext.Provider>
        </SocketContext.Provider>
      </Canvas>
      { 
        !match && <FullScreenContainer style={style}>
          <Loading />
        </FullScreenContainer> 
      }
      { 
        isMyTurn && <div className='turn'>
          Your turn!
        </div> 
      }
    </div>
  );
}

export default Match;