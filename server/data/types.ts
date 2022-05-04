import type { Match } from './Match' 

type IUser = {
  id: string,
  name : string
}

type IRoom = {
  id: string,
  name: string,
  users: Array<IUser>
}

type IMatch = Match

export type {
  IUser,
  IRoom,
  IMatch
}