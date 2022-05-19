import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './cto/create-user-dto';
import { User, UserDocument } from './user.model';
import { MailService } from 'src/mail/mail.service';
import { DateUtil } from 'src/common/date-util';
import { ConfirmationFailedException } from 'src/common/exceptions/confirmation-failed.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  /**
   * Creates a new user, stores the user with the hashed password in the database and sends a confirmation link via email.
   * @param createUserDto user to register
   */
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hash(createUserDto.password);
    const confirmationToken = uuidv4();

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      confirmationToken,
    });

    try {
      await newUser.save();
    } catch (error) {
      throw new BadRequestException({
        error: error,
      });
    }

    this.mailService.sendUserConfirmation(newUser);
  }

  /**
   * Confirms an user account if
   * - the user has not already been confirmed,
   * - the passed user id belongs to a user in the database,
   * - the passed token matches the registrationToken of the given user,
   * - the registration period is not expired
   * @param userId userId of the user to confirm
   * @param token registration token of the user to confirm
   */
  async confirm(userId: string, token: string) {
    const user = await this.userModel.findById(userId).exec();

    if (user.isConfirmed) {
      throw new ConfirmationFailedException('User already confirmed');
    }

    if (!user) {
      throw new ConfirmationFailedException('UserId invalid');
    }

    if (user.confirmationToken !== token) {
      throw new ConfirmationFailedException('Token invalid');
    }

    if (this.isRegistrationPeriodExpired(user.confirmationTokenTimestamp)) {
      throw new ConfirmationFailedException('Registration link expired');
    }

    user.isConfirmed = true;
    user.confirmationToken = null;
    user.confirmationTokenTimestamp = null;

    await user.save();
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

  /**
   * Helper method that hashes a passed value
   * @param value value to hash
   * @returns hashed value
   */
  private async hash(value: string) {
    return await argon2.hash(value);
  }
}
