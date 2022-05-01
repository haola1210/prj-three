import { Request, Response } from 'express';
import { RoomDB } from '../data';
function getAllRooms(req : Request, res: Response){
  const rooms = RoomDB.getAllRooms()
  res.json({
    status: 'ok',
    rooms
  })
}

export {
  getAllRooms
}