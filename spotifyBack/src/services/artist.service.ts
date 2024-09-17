import { artistRepo } from '@/repositories/artist.repository';
import { IArtists } from '@/interfaces/IArtists';

export class ArtistService {

  getPublishArtists = async () => {
    return await artistRepo.getPublish()
  }

  getAllArtists = async () => {
    return await artistRepo.getAll()
  }

  createArtist = async (data: IArtists) => {
    const createArtist = {
      name: data.name,
      image: data.image,
      information: data.information
    }
    return await artistRepo.create(createArtist);
  };
  publishArtist = async (id:number) => {
    return await artistRepo.publishArtist(id)
  }
  detetePublishArtist = async (id:number) => {
    return await artistRepo.detetePublishArtist(id)
  }
}
