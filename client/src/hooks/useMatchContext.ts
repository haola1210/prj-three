import { MatchContext } from '@contexts/MatchContext';
import { useContext } from 'react';
function useMatchContext(){
  const match = useContext(MatchContext)
  return match
}

export default useMatchContext