import { Artist } from '@/entities/artist';
import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Request } from 'express';

class ArtistRepo {
  private repo: Repository<Artist>

  constructor() {
    this.repo = appDataSource.getRepository(Artist);
  }

  async create(body:{}) {
    return await this.repo.save(body);
  }

  async getPublish() {
    return await this.repo.find({where: {publish:true}})
  }
  
  async getAll() {
    return await this.repo.find();
  }

  async getOneArtist(req: Request) {
    const msg = req.query.artist as string
    return await this.repo.find({where: {id: Number(msg), albums: {
      publish: true
      }},relations:{albums:true}, order: {
      albums: {
          year: 'ASC',
      }, 
    },
} );
}
async publishArtist(id:number) {
  const album = await this.repo.find({where: {id: id}});
  album[0].publish = true
  return await this.repo.save(album[0])
}

async detetePublishArtist(id:number) {
  const album = await this.repo.find({where: {id: id}});
  if(album[0].publish==true) {
    return await this.repo.delete(album[0])
  }else {
    throw Error
  }
}
}

export const artistRepo = new ArtistRepo();