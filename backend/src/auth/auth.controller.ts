import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
  }

  @Get('confirm')
  @Public()
  @HttpCode(HttpStatus.OK)
  confirm(@Query('userId') userId: string, @Query('token') token: string) {
    return this.authService.confirm(userId, token);
  }

  @Post('resend-confirmation-link')
  @Public()
  @HttpCode(HttpStatus.OK)
  async resendConfirmationLink(@Body() loginUserDto: LoginUserDto) {
    await this.authService.resendConfirmationLink(loginUserDto);
  }

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.authService.signIn(loginUserDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
