import { RequestHandler } from 'express';
import { ArtistService } from '@/services/artist.service';
import { ArtistDto } from '@/dto/artistDto';
import { plainToInstance } from 'class-transformer';

export class ArtistController {
  private service: ArtistService;

  constructor() {
    this.service = new ArtistService();
  }

  getPublishArtists:RequestHandler = async (req, res) => {
    const artists = await this.service.getPublishArtists();
    res.send(artists)
  };

  getAllArtists: RequestHandler = async (req, res) => {
    const artists = await this.service.getAllArtists();
    res.send(artists)
  };
  createArtist: RequestHandler = async (req, res): Promise<void> => {
    const artistDto = plainToInstance(ArtistDto, req.body);
    if(req.file) artistDto.image = req.file.filename;
    const artist = await this.service.createArtist(artistDto);
    res.send(artist);
  };
  publishArtist: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const albums = await this.service.publishArtist(id)
    res.send(albums)
  };

  deletePublishArtist: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    try {
      const albums = await this.service.detetePublishArtist(id)
      res.send(albums)
    } catch (error) {
      res.status(400).send({error:'Error'})
    }
  };
}
