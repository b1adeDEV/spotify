import { RequestHandler } from 'express';
import { AlbumService } from '@/services/album.service';
import { plainToInstance } from 'class-transformer';
import { AlbumDto } from '@/dto/albumDto';

export class AlbumController {
  private service: AlbumService;

  constructor() {
    this.service = new AlbumService();
  }

  getPublishAlbums: RequestHandler = async (req, res) => {
    const albums = await this.service.getPublishAlbums(req);
    res.send(albums)
  };

  getOneAlbum: RequestHandler = async (req, res) => {
    const albumId = req.params.id;
    const albums = await this.service.getOneAlbum(albumId);
    res.send(albums)
  };

  getAllAlbums: RequestHandler = async (req, res) => {
    const albums = await this.service.getAllAlbums()
    res.send(albums)
  };
  
  publishAlbums: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const albums = await this.service.publishAlbum(id)
    res.send(albums)
  };
  
  deletePublishAlbum: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    try {
      const albums = await this.service.detetePublishAlbum(id)
      res.send(albums)
    } catch (error) {
      res.status(400).send({error:'Error'})
    }
  };
  
  createAlbum: RequestHandler = async (req, res): Promise<void> => {
    const albumDto = plainToInstance(AlbumDto, req.body);
    if(req.file) albumDto.image = req.file.filename;
    const albums = await this.service.createAlbum(albumDto);
    res.send(albums);
  };
}
