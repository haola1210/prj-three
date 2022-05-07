import { useStartGame } from '@/hooks';
import { useEffect, useState } from 'react';
import { CountDownProps } from './types';

function CountDown({ matchId, setGameStatus } : CountDownProps) {
  const [counter, setCounter] = useState(5)
  const startGame = useStartGame(matchId)

  useEffect(() => {
    if(counter > 0){
      const countDown = setTimeout(() => {
        setCounter(prev => prev-1)
      }, 1500)


      return () => {
        clearTimeout(countDown)
      }
    }

    if(counter === 0){
      setGameStatus()
      startGame()
    }

  }, [counter])

  return (
    <>
      { counter }
    </>
  );
}

export default CountDown;