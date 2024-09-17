import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { TrackService } from '@/services/track.service';
import { TrackDto } from '@/dto/trackDto';

export class TrackController {
  private service: TrackService;

  constructor() {
    this.service = new TrackService();
  }

  getPublishTrack: RequestHandler = async (req, res) => {
    const artists = await this.service.getPublishTrack(req);
    res.send(artists)
  };

  getAllTrack: RequestHandler = async (req, res) => {
    const artists = await this.service.getAllTrack(req);
    res.send(artists)
  };
  createTrack: RequestHandler = async (req, res): Promise<void> => {
    try {
      const trackDto = plainToInstance(TrackDto, req.body);
    const track = await this.service.createTrack(trackDto);
    res.send(track);
    } catch (error) {
      res.status(400).send(error)
    }
  };
  publishTrack: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const albums = await this.service.publishTrack(id)
    res.send(albums)
  };
  
  deletePublishTrack: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    try {
      const albums = await this.service.deletePublishTrack(id)
      res.send(albums)
    } catch (error) {
      res.status(400).send({error:'Error'})
    }
  };

}
