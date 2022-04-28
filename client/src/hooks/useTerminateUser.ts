import { UserContext } from '@contexts/UserContext';
import axios from "axios"
import { useCallback, useContext, useEffect, useLayoutEffect } from "react"

function useTerminateUser(){

  const userCtx = useContext(UserContext)

  useEffect(() => {
    console.log(userCtx?.user)
    if(userCtx && userCtx.user && userCtx.user.name){
      const terminate = () => {
        axios.post("/api/user-terminate", { user : userCtx.user })
      }
      window.addEventListener('beforeunload', terminate)

      return () => {
        console.log("delete")
        window.removeEventListener('beforeunload', terminate)
      }
    }
  }, [userCtx])
}

export default useTerminateUser