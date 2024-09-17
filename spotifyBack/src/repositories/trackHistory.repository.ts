import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { TrackHistory } from '@/entities/trackHistory';
import { trackRepo } from '@/repositories/track.repository';
import _ from 'lodash';

class TrackHistoryRepo {
  private repo: Repository<TrackHistory>

  constructor() {
    this.repo = appDataSource.getRepository(TrackHistory);
  }

  async get(userId:number) {
    const data = await this.repo.find({ where: {
        user: {
          id: userId
        }
      },relations: {track:true}} )
    return data;
  }


  async create(userData:any) {
    const track = await trackRepo.getOne(userData.track)
    if(!track) {
      throw new Error('Invalid track ID')
    }else {
      return this.repo.save(userData)
    }
  }



}

export const historyRepo = new TrackHistoryRepo();