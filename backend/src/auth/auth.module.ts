import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MailModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
