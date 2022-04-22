import React, { useEffect } from 'react';
import { useUserContext } from '@hooks';

import "./Home.scss"
function Home() : JSX.Element {
  const userState = useUserContext()
  
  useEffect(() => {
    console.log(userState?.user)
  }, [])
  return (
    <div className='Home'>
      
    </div>
  );
}

export default Home;