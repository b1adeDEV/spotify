import { Router } from 'express';
import { IRoute } from '@/interfaces/IRoute.interface';
import { TrackController } from '@/controllers/trackHistory.controller';
import { authValidate } from '@/middlewares/auth';

export class TrackHistoryRoute implements IRoute {
  public path = '/track_history';
  public router = Router();
  private controller: TrackController;

  constructor() {
    this.controller = new TrackController();
    this.init();
  }

  private init() {
    this.router.get('/',authValidate,this.controller.getHistory);
    this.router.post('/', authValidate,this.controller.createHistory);
  }
}
