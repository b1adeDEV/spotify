import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Track } from '@/entities/track';

class TrackRepo {
  private repo: Repository<Track>

  constructor() {
    this.repo = appDataSource.getRepository(Track);
  }

  async create(body:{}) {
    return await this.repo.save(body);
  }

  async getAll() {
    return await this.repo.find();
  }

  async getOne(id:number) {
    return await this.repo.findOne({where:{id:id}});
  }


  async getPublish() {
    return await this.repo.findOne({where:{publish:true}});
  }

  async publishTrack(id:number) {
    const album = await this.repo.find({where: {id: id}});
    album[0].publish = true
    return await this.repo.save(album[0])
  }

  async deletePublishTrack(id:number) {
    const album = await this.repo.find({where: {id: id}});
    if(album[0].publish==true) {
      return await this.repo.delete(album[0])
    }else {
      throw Error
    }
  }  

}

export const trackRepo = new TrackRepo();