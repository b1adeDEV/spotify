import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { User } from '@/entities/user';
import { SignInUserDto } from '@/dto/userSignInDto';
import { RegistrationUserDto } from '@/dto/userRegDto';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const SALT_WORK_FACTOR = 10;

class UserRepo {
  private repo: Repository<User>

  constructor() {
    this.repo = appDataSource.getRepository(User);
  }

  async signIn(signInUserDto: SignInUserDto) {
    const userData = await this.repo.findOne({where:{username:signInUserDto.username}})
    if (!userData) throw new Error('Invalid username or password')
    const isCorrect = await userData.comparePassword(signInUserDto.password)
    if(!isCorrect) throw new Error("Invalid username or password")
    userData.generateToken()
    const user = await this.repo.save(userData)
    return _.omit(user, "password", "username", "id")
  }

  async registration(registrationUserDto: RegistrationUserDto)  {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    registrationUserDto.password = await bcrypt.hash(registrationUserDto.password, salt);
    try {
      const user = await this.repo.save(registrationUserDto)
      return _.omit(user, "password","token")
    } catch (e) {
      throw new Error ("Such a user already exists")
    }
  }

  
  async clearToken(token: string) {
    const user = await this.findToken(token);
    user[0].token = null!
    await this.repo.save(user[0])
  }

  async findToken(token:string) {
    return await this.repo.find({where:{token:token}})
  }
}

export const userRepo = new UserRepo();