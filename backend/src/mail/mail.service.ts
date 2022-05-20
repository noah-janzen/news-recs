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
    const confirmationLink = new URL(
      this.configService.get<string>('CONFIRMATION_LINK_HOST') +
        '/auth/confirm',
    );
    confirmationLink.searchParams.set('userId', user.id);
    confirmationLink.searchParams.set('token', user.confirmationToken);

    await this.mailerService.sendMail({
      to: user.email,
      subject: this.configService.get<string>('CONFIRMATION_MAIL_SUBJECT'),
      template: 'confirmation.hbs',
      context: {
        name: user.firstName,
        confirmationLink: confirmationLink.toString(),
      },
    });
  }
}
