import { Request, Response } from 'express';
import { RoomDB } from '../data';
function getAllRooms(req : Request, res: Response){
  const rooms = RoomDB.getAllRooms()
  res.json({
    status: 'ok',
    rooms
  })
}

function getOneRoom(req: Request, res: Response){
  try {
    
    const { id } = req.params
    if(!id){
      throw new Error('Id is invalid')
    }
    const room = RoomDB.getOneRoom(id)
    res.json({
      status: 'ok',
      room
    })
  } catch (error : InstanceType<Error>) {
    res.json({
      status: 'error',
      message: error.message
    })
  }
}

export {
  getAllRooms,
  getOneRoom
}