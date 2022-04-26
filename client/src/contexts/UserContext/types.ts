import { ReactChild } from 'react';

type UserContextProviderProps = {
  children: ReactChild
}

type User = {
  id: string
  name: string
}

type UserContextType = {
  user: User,
  setUser : React.Dispatch<React.SetStateAction<User>>
}

export type {
  UserContextProviderProps,
  User,
  UserContextType
}