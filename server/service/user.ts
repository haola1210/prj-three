import { Request, Response } from "express"
import { UserDB } from "../data"
import { IUser } from "../data/types"

function userNaming(req: Request, res: Response){
  try {
    const { name } : { name: string } = req.body
    const user = UserDB.addNew(name)
    res.json({
      status: 'ok',
      user
    })
  } catch (error : InstanceType<Error>) {
    res.json({
      status: 'error',
      message: error.message
    })
  }
}

function userTerminate(req: Request, res: Response){
  try {
    const { user } : { user : IUser} = req.body
    UserDB.deleteOne(user.id)
    console.log("delete user " + user.name)
    res.json({
      status: "ok",
      data: "deleted"
    })
  } catch (error : InstanceType<Error>) {
    res.json({
      status : "error",
      message : error.message
    })
  }
}

export {
  userNaming,
  userTerminate
}