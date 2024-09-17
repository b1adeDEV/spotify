import { historyRepo } from '@/repositories/trackHistory.repository';
import { Request } from 'express';
import { userRepo } from '@/repositories/user.repository';

export class TrackHistoryService {

  getHistory = async (req:Request) => {
    if(req.headers.authorization) {
      const userId = await userRepo.findToken(req.headers.authorization)
      if(userId.length==0){
        throw new Error("Invalid token")
      }else {
        return await historyRepo.get(userId[0].id)
      }
    }else {
      throw new Error("Invalid data")
    }
  }

  createHistory = async (req:Request) => {
    if(req.headers.authorization) {
      const userId = await userRepo.findToken(req.headers.authorization)
      if(userId.length==0){
        throw new Error("Invalid token")
      }else {
        const obj = {
          user:userId[0].id,
          track: req.body.track,
        }
        return await historyRepo.create(obj);
      }
    }else {
      throw new Error("Invalid data")
    }
  }
}
