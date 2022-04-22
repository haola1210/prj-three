import { Canvas } from '@react-three/fiber';
import Cube from '@components/3Ds/Cube';
import Controls from '@components/3Ds/Controls';
import Camera from '@components/3Ds/Camera';

import "./Match.scss"
import Board from '@components/3Ds/Board';
import { Suspense, useEffect, useState } from 'react';
import Loading from '@components/Loading';
function Match() {

  return (
    <div className='Match'>
      <Canvas>
        <Camera position={[0, 0, 15]} />
        <Controls />
        <Suspense fallback={<Loading />}>
          <Board size={10} color1={"white"} color2={"black"} pad={0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Match;