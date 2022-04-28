import { SocketContext } from '@contexts/SocketContext';
import { useContext } from 'react';
function useSocketContext(){
  const ctx = useContext(SocketContext)
  return ctx
}

export default useSocketContext