import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('own')
  getOwnUser(@GetCurrentUserId() userId: string) {
    return this.usersService.getOwnUser(userId);
  }

  @Post('own')
  updateOwnUser(
    @GetCurrentUserId() userId: string,
    @Body() userUpdate: UserUpdateDto,
  ) {
    return this.usersService.updateUser(userId, userUpdate);
  }
}
