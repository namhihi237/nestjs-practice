import { UserCreateDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByUsername(userName: string): Promise<User> {
    return this.userRepository.findOneBy({ userName });
  }

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userRepository.create(userCreateDto);

    await this.userRepository.save(user);
    return user;
  }
}
