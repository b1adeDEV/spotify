import { IAlbum } from '@/interfaces/IAlbum';
import { albumRepo } from '@/repositories/album.repository';
import { Request } from 'express';
import { artistRepo } from '@/repositories/artist.repository';

export class AlbumService {

  getPublishAlbums = async (req: Request) => {
    if (req.query.artist) {
      return await artistRepo.getOneArtist(req)
    }else {
      return await albumRepo.getPublishAlbums()
    }
  }

  getAllAlbums = async () => {
    return await albumRepo.getAllAlbums()
  }
  
  getOneAlbum = async (albumId: string) => {
    return await albumRepo.getOneAlbums(albumId)
  }

  publishAlbum = async (id:number) => {
    return await albumRepo.publishAlbums(id)
  }
  detetePublishAlbum = async (id:number) => {
    return await albumRepo.detetePublishAlbum(id)
  }


  createAlbum = async (data:IAlbum) => {
    const createAlbum = {
      name: data.name,
      artist: data.artist,
      year: data.year,
      image: data.image
    }
    return await albumRepo.createAlbum(createAlbum);
  };
}
