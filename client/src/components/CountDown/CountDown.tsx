import { useEffect, useState } from 'react';

function CountDown() {
  const [counter, setCounter] = useState(5)

  useEffect(() => {
    if(counter > 0){
      const countDown = setTimeout(() => {
        setCounter(prev => prev-1)
      }, 1500)


      return () => {
        clearTimeout(countDown)
      }
    }

  }, [counter])

  return (
    <>
      { counter }
    </>
  );
}

export default CountDown;