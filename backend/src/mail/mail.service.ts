import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.model';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: this.configService.get<string>('CONFIRMATION_MAIL_SUBJECT'),
      template: 'confirmation.hbs',
      context: {
        confirmationToken: user.confirmationToken,
      },
    });
  }

  async sendUserChangePasswordToken(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: this.configService.get<string>(
        'CHANGE_PASSWORD_TOKEN_MAIL_SUBJECT',
      ),
      template: 'change-password-token.hbs',
      context: {
        changePasswordToken: user.changePasswordToken,
      },
    });
  }
}
