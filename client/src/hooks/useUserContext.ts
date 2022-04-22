import { useContext } from "react"
import { UserContext } from "@contexts/UserContext"

const useUserContext = () => {
  const userState = useContext(UserContext)
  return userState
}

export default useUserContext