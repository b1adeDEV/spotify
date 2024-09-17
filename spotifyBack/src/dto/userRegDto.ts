import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegistrationUserDto {
  @Expose()
  @IsNotEmpty({message:"Логин не должен быть пустым"})
  @IsString({message:"Логин должен быть строкой"})
  username!:string

  @Expose()
  @IsNotEmpty({message:"Пароль не должен быть пустым"})
  @IsString({message:"Пароль должен быть строкой"})
  password!:string

  @IsOptional()
  token!:string
}