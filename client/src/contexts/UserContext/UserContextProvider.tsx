import { useState } from "react"

import UserContext from "./UserContext"
import type { 
  UserContextProviderProps,
  User
} from "./types"

function UserContextProvider({ children }: UserContextProviderProps){

  const [user, setUser] = useState<User>({
    name : '', 
    id : '' 
  })

  return <UserContext.Provider value={{ user, setUser }}>
    { children }
  </UserContext.Provider>
}

export default UserContextProvider