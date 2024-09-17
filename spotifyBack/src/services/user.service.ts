import { SignInUserDto } from '@/dto/userSignInDto';
import { RegistrationUserDto } from '@/dto/userRegDto';
import { userRepo } from '@/repositories/user.repository';

export class UserService {

  async signIn(signInUserDto: SignInUserDto) {
    return await userRepo.signIn(signInUserDto);
  }


  async registration(registrationUserDto: RegistrationUserDto) {
    return await userRepo.registration(registrationUserDto);
  }


  async logout(token: string): Promise<void> {
    await userRepo.clearToken(token);
  }
  
}
