import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConfirmationFailedException } from 'src/common/exceptions/confirmation-failed.exception';
import { CreateUserDto } from './cto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
    @Query('userId') userId: string,
    @Query('token') token: string,
  ) {
    try {
      await this.usersService.confirm(userId, token);
    } catch (ex) {
      return 'Error: ' + ex.getResponse().error;
    }

    return `Registration confirmed`;
  }
}
