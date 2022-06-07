import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestException, Injectable } from '@nestjs/common';
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
    const hashedPassword = await argon2.hash(createUserDto.password);
    const confirmationToken = uuidv4();

    let newUser;
    try {
      newUser = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
        confirmationToken,
      });
    } catch (error) {
      if (this.emailAlreadyRegistered(error)) {
        throw new BadRequestException(
          'This email address has already been registered.',
        );
      }
      throw error;
    }

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
      throw new BadRequestException('UserId invalid');
    }

    if (!user) {
      throw new BadRequestException('Could not find user');
    }

    if (user.isConfirmed) {
      throw new BadRequestException('User already confirmed');
    }

    if (user.confirmationToken !== token) {
      throw new BadRequestException('Token invalid');
    }

    if (this.isRegistrationPeriodExpired(user.confirmationTokenTimestamp)) {
      throw new BadRequestException('Registration link expired');
    }

    await this.usersService.confirm(userId);
  }

  signIn() {
    // TODO: Implement method
  }

  logout() {
    // TODO: Implement method
  }

  refreshTokens() {
    // TODO: Implement method
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

  private emailAlreadyRegistered(error) {
    return error.code === 11000 && error.keyPattern.email === 1;
  }
}
