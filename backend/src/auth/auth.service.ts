import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from './dto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { ConfirmationFailedException } from 'src/common/exceptions/confirmation-failed.exception';
import { DateUtil } from 'src/common/util/date-util';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  /**
   * Creates a new user, stores the user with the hashed password in the database and sends a confirmation link via email.
   * @param createUserDto user to sign up
   */
  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hash(createUserDto.password);
    const confirmationToken = uuidv4();

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      confirmationToken,
    });

    this.mailService.sendUserConfirmation(newUser);

    return newUser;
  }

  /**
   * Confirms an user account if
   * - the passed user id belongs to a user in the database,
   * - the user has not already been confirmed,
   * - the passed token matches the registrationToken of the given user,
   * - the registration period is not expired
   * @param userId userId of the user to confirm
   * @param token registration token of the user to confirm
   */
  async confirm(userId: string, token: string) {
    let user;
    try {
      user = await this.usersService.findById(userId);
    } catch (error) {
      throw new ConfirmationFailedException('UserId invalid');
    }

    if (!user) {
      throw new ConfirmationFailedException('User not found');
    }

    if (user.isConfirmed) {
      throw new ConfirmationFailedException('User already confirmed');
    }

    if (user.confirmationToken !== token) {
      throw new ConfirmationFailedException('Token invalid');
    }

    if (this.isRegistrationPeriodExpired(user.confirmationTokenTimestamp)) {
      throw new ConfirmationFailedException('Registration link expired');
    }

    await this.usersService.confirm(userId);
  }

  signIn() {}

  logout() {}

  refreshTokens() {}

  /**
   * Helper method that hashes a passed value
   * @param value value to hash
   * @returns hashed value
   */
  private async hash(value: string) {
    return await argon2.hash(value);
  }

  /**
   * Helper method that checks whether the confirmation token timestamp is not expired
   * @param confirmationTokenTimestamp timestamp of the token creation
   * @returns true iff the timestamp is not expired
   */
  private isRegistrationPeriodExpired(confirmationTokenTimestamp) {
    const registrationDate = new Date(confirmationTokenTimestamp.toString());
    const CONFIRMATION_PERIOD_IN_HOURS = this.configService.get<number>(
      'CONFIRMATION_PERIOD_IN_HOURS',
    );
    return !DateUtil.isInRange(registrationDate, CONFIRMATION_PERIOD_IN_HOURS);
  }
}
