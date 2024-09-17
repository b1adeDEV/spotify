import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Album } from '@/entities/album';
import { Request } from 'express';

class AlbumRepo {
  private repo: Repository<Album>

  constructor() {
    this.repo = appDataSource.getRepository(Album);
  }

  async createAlbum(body:{}) {
    return await this.repo.save(body);
  }

  async getPublishAlbums() {
    return await this.repo.find({where: {publish:true}});
  }

  async getOneAlbums(id:string)  {
    return await this.repo.find({where: {id:Number(id)},relations: {artist:true}});
  }

  async getOne(req:Request) {
    const msg = req.query.album as string
    return await this.repo.find({where: {id: Number(msg)},relations:{tracks:true} });
  }
  async getAllAlbums()  {
    return await this.repo.find()
  }

  async getOnePublish(req:Request) {
    const msg = req.query.album as string
    return await this.repo.find({where: {id: Number(msg), publish:true},relations:{tracks:true} });
  }

  async publishAlbums(id:number) {
    const album = await this.repo.find({where: {id: id}});
    album[0].publish = true
    return await this.repo.save(album[0])
  }

  async detetePublishAlbum(id:number) {
    const album = await this.repo.find({where: {id: id}});
    if(album[0].publish==true) {
      return await this.repo.delete(album[0])
    }else {
      throw Error
    }
  }

}

export const albumRepo = new AlbumRepo();