import Controls from '@components/3Ds/Controls';
import { Box } from '@components/3Ds/Cube';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import "./Lobby.scss"
function Lobby() {
  return (
    <div className='lobby'>
      <h1 className='lobby__title'>Welcome bro!</h1>
      <div className='lobby__status'>Waiting for opponent...</div>
      <div className='lobby__count-down'></div>
      <div className='lobby__description'> Your chess: </div>
      <Canvas className='user-chess-point'>
        <Controls />
        <Box color="red" size={[1, 1, 1]} />
      </Canvas>
    </div>
  );
}

export default Lobby;