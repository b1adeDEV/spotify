import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { ArtistController } from '@/controllers/artist.controller';
import upload from '@/middlewares/upload';
import { authValidate } from '@/middlewares/auth';
import { checkRole } from '@/middlewares/checkRole';
import { UserRole } from '@/interfaces/IUser';

export class ArtistRoute implements IRoute {
  public path = '/artists';
  public router = Router();
  private controller: ArtistController;

  constructor() {
    this.controller = new ArtistController();
    this.init();
  }

  private init() {
    this.router.get('/',this.controller.getPublishArtists);
    this.router.post("/", authValidate, upload.single("image"),this.controller.createArtist);
    this.router.get("/all", authValidate, checkRole(UserRole.administrator),  this.controller.getAllArtists)
    this.router.post("/all/:id", authValidate, checkRole(UserRole.administrator),  this.controller.publishArtist)
    this.router.delete("/all/:id", authValidate, checkRole(UserRole.administrator),  this.controller.deletePublishArtist)
    
  }
}
