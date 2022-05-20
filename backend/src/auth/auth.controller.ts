import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.signUp(createUserDto);
    } catch (error) {
      const message = ['User creation failed'];
      if (error.code === 11000 && error.keyPattern.email === 1) {
        message.push('The email address has already been registered.');
      }
      throw new BadRequestException(message);
    }
  }

  @Get('confirm')
  async confirm(
    @Query('userId') userId: string,
    @Query('token') token: string,
  ) {
    try {
      await this.authService.confirm(userId, token);
    } catch (ex) {
      return 'Error: ' + ex.getResponse().error;
    }

    return `Registration confirmed`;
  }

  @Post('sign-in')
  signIn() {
    this.authService.signIn();
  }

  @Post('logout')
  logout() {
    this.authService.logout();
  }

  @Post('refresh')
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
