 import { Controller, Post, Body, UseGuards } from '@nestjs/common';
 import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }
}
