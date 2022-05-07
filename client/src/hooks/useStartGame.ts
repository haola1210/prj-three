import { useNavigate } from "react-router-dom"
function useStartGame(id: string){
  const navigate = useNavigate()
  return () => {
    console.log('mtach: ' + id)
    navigate(`/match/${id}`)
  }
}

export default useStartGame