import { trackRepo } from '@/repositories/track.repository';
import { ITruck } from '@/interfaces/ITruck';
import { Request } from 'express';
import { albumRepo } from '@/repositories/album.repository';

export class TrackService {

  getPublishTrack = async (req: Request) => {
    if (req.query.album) {
      return await albumRepo.getOnePublish(req);
    } else {
      return await trackRepo.getPublish();
    }
  };

  getAllTrack = async (req: Request) => {
    if (req.query.album) {
      return await albumRepo.getOne(req);
    } else {
      return await trackRepo.getAll();
    }
  };

  createTrack = async (data: ITruck) => {
    const createTrack = {
      name: data.name,
      albums: data.albums,
      duration: data.duration,
    };
    return await trackRepo.create(createTrack);
  };

  publishTrack = async (id:number) => {
    return await trackRepo.publishTrack(id)
  }
  deletePublishTrack = async (id:number) => {
    return await trackRepo.deletePublishTrack(id)
  }
}
