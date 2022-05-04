type IUser = {
  id: string,
  name: string
}
type IRoom = {
  id: string, 
  name: string,
  users: Array<IUser>
}
type IMatchPrimary = {
  users: Array<IUser>;
  id : IRoom['id'];
  roomName : string;
  turnControl : { [key in IUser['id']] : IUser['id'] }
  userChess : { [key in IUser['id']] : "red" | "blue" }
  currentTurn : IUser['id']
  isReady : boolean
}

export type {
  IRoom,
  IUser,
  IMatchPrimary
}