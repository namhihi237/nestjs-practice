import { UserCreateDto } from './../users/dto/user-create.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    return this.authService.register(userCreateDto);
  }
}
