import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { TrackController } from '@/controllers/track.controller';
import { authValidate } from '@/middlewares/auth';
import { UserRole } from '@/interfaces/IUser';
import { checkRole } from '@/middlewares/checkRole';


export class TrackRoute implements IRoute {
  public path = '/tracks';
  public router = Router();
  private controller:TrackController;

  constructor() {
    this.controller = new TrackController();
    this.init();
  }

  private init() {
    this.router.get('/', authValidate,this.controller.getPublishTrack);
    this.router.post("/", authValidate,this.controller.createTrack);
    this.router.get('/all', authValidate, checkRole(UserRole.administrator),this.controller.getAllTrack)
    this.router.post("/all/:id", authValidate, checkRole(UserRole.administrator), this.controller.publishTrack)
    this.router.delete("/all/:id", authValidate, checkRole(UserRole.administrator), this.controller.deletePublishTrack)
  
  }
}
