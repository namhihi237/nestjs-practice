import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;
}
