import { ContextType, createContext } from "react";
import type { UserContextType } from './types'

const UserContext = createContext<UserContextType | null>(null)

export default UserContext