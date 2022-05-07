import { Request, Response } from "express"
import { MatchManageDB } from "../data"
function getOneMatch(req: Request, res: Response){
  try {
    const { id } = req.params
    if(!id){
      throw new Error("Match is not exist")
    }
    const match = MatchManageDB.findMatch(id)
    res.json({
      status: 'ok',
      match
    })
  } catch (error: InstanceType<Error>) {
    res.json({
      status: 'error',
      message: error.message
    })
  }
}

export {
  getOneMatch
}