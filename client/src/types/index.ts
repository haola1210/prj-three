type IUser = {
  id: string,
  name: string
}
type IRoom = {
  id: string, 
  name: string,
  users: Array<IUser>
}

export type {
  IRoom,
  IUser
}