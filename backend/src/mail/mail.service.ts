import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'XYZ',
      template: 'confirmation.hbs',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
