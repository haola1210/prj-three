import { useUserContext, useSocketContext } from '@hooks';
import { UserContext } from '@contexts/UserContext';
import axios from "axios"
import { useCallback, useContext, useEffect, useLayoutEffect } from "react"

function useTerminateUser(){

  const userCtx = useUserContext()
  const socket = useSocketContext()

  // useEffect(() => {
  //   console.log(userCtx?.user)
  //   if(userCtx && userCtx.user && userCtx.user.name){
  //     const terminate = () => {
  //       socket?.emit('user-terminate', { user: userCtx.user })
  //       axios.post('/api/user-terminate', { user: userCtx.user })
  //     }
  //     window.addEventListener('beforeunload', terminate)
  //     window.addEventListener('unload', terminate)

  //     return () => {
  //       console.log("delete")
  //       window.removeEventListener('beforeunload', terminate)
  //       window.removeEventListener('unload', terminate)
  //     }
  //   }
  // }, [userCtx])
}

export default useTerminateUser