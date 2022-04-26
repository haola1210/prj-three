import React, { useEffect } from 'react';
import { useUserContext } from '@hooks';

import UserForm from '@components/UserForm';

import "./Home.scss"
function Home() : JSX.Element {
  const userState = useUserContext()
  
  useEffect(() => {
    console.log(userState?.user)
  })
  return (
    <div className='Home'>
      <h1>Get ready!</h1>
      <UserForm />
    </div>
  );
}

export default Home;