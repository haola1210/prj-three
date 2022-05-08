import { IUser, IRoom } from "./types";

function randomBin(min = 0, max = 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const mapColor : { [key in 'red' | 'blue'] : 1 | -1 } = {
  red: 1,
  blue: -1
}
type ArrayLength10<T> = { [k in number ] : T } & { length : 10 }
type Trinary = 1 | 0 | -1

function get1Line(matrix: Match['matrix'], x : number, y: number, deltaX: Trinary, deltaY: Trinary){
  const res : Array<number> = []
  while(x < matrix.length && y < matrix.length){
    res.push(matrix[y][x])

    x += deltaX
    y += deltaY
  }
  return res
}

function get4Lines(matrix: Match['matrix'], x : number, y: number){
  // case1: 0, x -> 10, x
  // case2: y, 0 -> y, 10 
  const case1 = get1Line(matrix, x, 0, 0, 1)
  const case2 = get1Line(matrix, 0, y, 1, 0)

  // case3
  const min = Math.min(x, y)
  const xC3 = x-min
  const yC3 = y-min
  const case3 = get1Line(matrix, xC3, yC3, 1, 1)

  // case4
  let xC4 = x+y
  let yC4 = y-y
  if(xC4 > matrix.length - 1) {
    const delta = Math.abs(xC4 - (matrix.length-1))
    xC4 -= delta
    yC4 += delta
  }
  const case4 = get1Line(matrix, xC4, yC4, -1, 1)

  return {
    case1,
    case2,
    case3,
    case4
  }
}

function checkWinEachCase(arr : number[], expectedLength : number){
  let range = expectedLength + 1
  if(arr.length === expectedLength){
    range = expectedLength
  }

  if(arr.length < range){
    return
  }
  for(let i = 0; i < arr.length - range; i++){
    let sum = 0
    for(let k = i; k <= i+range; k++){
      sum += arr[k]
    }

    if(Math.abs(sum) >= expectedLength){
      return sum
    } 
  }
}

function getUserWin(userChess : Match['userChess'], winCase : ReturnType<typeof checkWinEachCase>){
  if(winCase && winCase > 0){
    for(let userId in userChess){
      if(userChess[userId] === 'red'){
        return userId
      }
    }
  }
  if(winCase && winCase < 0){
    for(let userId in userChess){
      if(userChess[userId] === 'blue'){
        return userId
      }
    }
  }
}

class Match{
  users: Array<IUser> = [];
  id : IRoom['id'];
  roomName : string;
  turnControl : { [key in IUser['id']] : IUser['id'] }
  userChess : { [key in IUser['id']] : "red" | "blue" }
  currentTurn : IUser['id']
  isReady = false
  matrix : ArrayLength10<ArrayLength10<number>>

  constructor(id: string, roomName: string){
    this.id = id
    this.roomName = roomName
    this.turnControl = {}
    this.currentTurn = ""
    this.userChess = {}

    // 
    this.matrix = Array.from(
      { length : 10 }, 
      () => Array.from({ length: 10 }, () => 0)
    ) as Match['matrix']
  }

  userJoin(user: IUser){
    this.users.push(user)
    if(this.users.length === 2){
      const user1 = this.users[0]
      const user2 = this.users[1]
      this.turnControl[user1.id] = user2.id
      this.turnControl[user2.id] = user1.id
      const random = randomBin()
      this.currentTurn = this.users[random].id
      this.isReady = true
      const chesses : Array<'red' | 'blue'> = ['red', 'blue']
      this.userChess[user1.id] = chesses[random]
      this.userChess[user2.id] = chesses[1-random]
    }
  }

  changeTurnAndGetPrevTurn(){
    const prevTurn = this.currentTurn
    const nextTurn = this.turnControl[prevTurn]
    this.currentTurn = nextTurn
    return prevTurn
  }

  userAttack(userId : IUser['id'], position : { x: number, y: number }){
    const userChess = this.userChess[userId]
    const mappedValue = mapColor[userChess]
    // UI base Coordinate
    let { x, y } = position
    // convert to Logic base coordinate
    x -= 1
    y -= 1
    if(this.matrix[y][x] === 0){
      this.matrix[y][x] = mappedValue
    } else {
      throw new Error('Invalid position')
    }
  }

  checkWin(expectedLength : number, position : { x: number, y: number }){
    // UI base Coordinate
    let { x, y } = position
    // convert to Logic base coordinate
    x -= 1
    y -= 1

    const {
      case1,
      case2,
      case3,
      case4
    } = get4Lines(this.matrix, x, y)

    const isC1Win = checkWinEachCase(case1, expectedLength)
    const isC2Win = checkWinEachCase(case2, expectedLength)
    const isC3Win = checkWinEachCase(case3, expectedLength)
    const isC4Win = checkWinEachCase(case4, expectedLength)

    const winC1 = getUserWin(this.userChess, isC1Win)
    const winC2 = getUserWin(this.userChess, isC2Win)
    const winC3 = getUserWin(this.userChess, isC3Win)
    const winC4 = getUserWin(this.userChess, isC4Win)

    if(winC1){
      this.isReady = false
      return winC1
    }
    if(winC2){
      this.isReady = false
      return winC2
    }
    if(winC3){
      this.isReady = false
      return winC3
    }
    if(winC4){
      this.isReady = false
      return winC4
    }

  }

}


class MatchManage{
  matchs : Record<Match['id'], Match>
  constructor(){
    this.matchs = {}
  }

  joinMatch(matchId : Match['id'], user: IUser, roomName: string){
    const match = this.matchs[matchId]
    if(match){
      match.userJoin(user)
      return match
    } else {
      const newMatch = new Match(matchId, roomName)
      newMatch.userJoin(user)
      this.matchs[newMatch.id] = newMatch
      return newMatch
    }
  }

  findMatch(matchId : Match['id']){
    return this.matchs[matchId]
  }
  
  deleteMatch(matchId : Match['id']){
    const match = this.matchs[matchId]
    delete this.matchs[matchId]
    return match
  }

}

const MatchManageDB = new MatchManage()

export default MatchManageDB
export type {
  Match
}