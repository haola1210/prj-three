import { ReactChild } from 'react';

type UserContextProviderProps = {
  children: ReactChild
}

type User = {
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