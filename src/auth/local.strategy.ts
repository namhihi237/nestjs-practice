import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.validateUser(userLoginDto);
  }
}
