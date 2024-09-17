import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AlbumController } from '@/controllers/album.controller';
import upload from '@/middlewares/upload';
import { authValidate } from '@/middlewares/auth';
import { checkRole } from '@/middlewares/checkRole';
import { UserRole } from '@/interfaces/IUser';


export class AlbumRoute implements IRoute {
  public path = '/albums';
  public router = Router();
  private controller: AlbumController;

  constructor() {
    this.controller = new AlbumController();
    this.init();
  }

  private init() {
    this.router.get('/',this.controller.getPublishAlbums);
    this.router.get('/all', authValidate, checkRole(UserRole.administrator),this.controller.getAllAlbums )
    this.router.get("/:id",authValidate,this.controller.getOneAlbum);
    this.router.post("/", authValidate ,upload.single("image") ,this.controller.createAlbum);
    this.router.post("/all/:id", authValidate, checkRole(UserRole.administrator), this.controller.publishAlbums)
    this.router.delete("/all/:id", authValidate, checkRole(UserRole.administrator), this.controller.deletePublishAlbum)
  }
}
