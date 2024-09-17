import { UserService } from '@/services/user.service';
import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { SignInUserDto } from '@/dto/userSignInDto';
import { RegistrationUserDto } from '@/dto/userRegDto';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  signIn:RequestHandler = async(req, res) => {
   try {
    const signInDto = plainToInstance(SignInUserDto,req.body)
    const user = await this.service.signIn(signInDto)
    res.send(user)
   } catch (error) {
    res.status(401).send((error as Error).message)
   }
  }

  registration:RequestHandler = async(req, res) => {
    const registrationDto = plainToInstance(RegistrationUserDto,req.body)
    try {
      const user = await this.service.registration(registrationDto)
      res.send(user)
    }catch (error) {
      res.status(400).send({"error":(error as Error).message})
    }
  }
logout: RequestHandler = async (req, res) => {
    try {
      const token = req.headers.authorization;
      await this.service.logout(token!);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ error: { message: 'Internal server error' } });
    }
    return res.send({ message: `success ` });
  };


}