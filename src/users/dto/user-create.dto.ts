import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
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
