import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { UserController } from '@/controllers/user.controller';
import { authValidate } from '@/middlewares/auth';

export class UserRoute implements IRoute {
  public path = '/users';
  public router = Router();
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.init();
  }

  private init() {
    this.router.post('/sessions',this.controller.signIn);
    this.router.delete('/logout', authValidate,this.controller.logout);
    this.router.post("/",this.controller.registration);
  }
}
