import { Request, Response } from "express"
import { UserDB } from "../data"

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

export default userNaming