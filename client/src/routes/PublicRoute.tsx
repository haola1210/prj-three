import React from 'react';
import { Navigate, Outlet, useLocation, Location } from "react-router-dom"
import { useUserContext } from "@hooks"

type LocationState = {
  from? : {
    pathname: string
  }
}

function PublicRoute() {
  const userContext = useUserContext()
  const location = useLocation()
  let from = (location.state as LocationState)?.from?.pathname;
  if(!from || from === "/") from = "/rooms"

  if(!userContext?.user.id){
    return <Outlet />
  }

  return <Navigate to={from} replace={true} />
}

export default PublicRoute;