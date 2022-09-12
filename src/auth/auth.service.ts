import { UserCreateDto } from './../users/dto/user-create.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UserLoginDto) {
    const { userName, password } = userLoginDto;
    const user = await this.usersService.findUserByUsername(userName);

    if (!user) {
      throw new UnauthorizedException(`Username or password incorrect`);
    }

    if (password !== user.password) {
      throw new UnauthorizedException(`Username or password incorrect`);
    }

    return user;
  }

  async register(userCreateDto: UserCreateDto) {
    const { userName } = userCreateDto;
    const userExist = await this.usersService.findUserByUsername(userName);

    if (userExist) {
      throw new BadRequestException('User already');
    }

    return this.usersService.createUser(userCreateDto);
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto);
    const payload = { username: user.userName };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
