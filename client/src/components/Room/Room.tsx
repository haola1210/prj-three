import React, { useState } from 'react';
import type { RoomProps } from './types';

import './Room.scss'

function Room({ id, name, initNOUser } : RoomProps) {
  const [nOUser, setNOUser] = useState(initNOUser)

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