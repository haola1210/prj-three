import { useUserContext } from '@/hooks';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute() {
  const userContext = useUserContext()
  const location = useLocation()

  if(userContext?.user.id){
    return <Outlet />
  }

  return (
    <Navigate to="/" state={{ from: location }} replace={true} />
  );
}

export default PrivateRoute;