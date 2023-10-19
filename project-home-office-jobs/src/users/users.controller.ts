import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLogin, UserSignup, userLogin, userSignUp } from './dto/users.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(userSignUp))
  async signup(@Body() body: UserSignup) {
    return await this.usersService.signup(body);
  }
  @Post('login')
  @UsePipes(new ZodValidationPipe(userLogin))
  async login(@Body() body: UserLogin) {
    return await this.usersService.login(body);
  }
}
