import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';

import { RefreshTokenAuthGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  ConfirmUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  ChangePasswordDto as ChangePasswordDto,
} from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = await this.authService.signUp(createUserDto);
    return { userId: id };
  }

  @Post('confirm')
  @Public()
  @HttpCode(HttpStatus.OK)
  confirm(@Body() confirmUserDto: ConfirmUserDto) {
    return this.authService.confirm(confirmUserDto);
  }

  @Post('renew-confirmation-token')
  @Public()
  @HttpCode(HttpStatus.OK)
  async renewConfirmationToken(@Body() loginUserDto: LoginUserDto) {
    await this.authService.renewConfirmationToken(loginUserDto);
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

  @Post('forgot-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.sendChangePasswordToken(forgotPasswordDto.email);
  }

  @Post('change-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    await this.authService.changePassword(changePasswordDto);
  }
}
