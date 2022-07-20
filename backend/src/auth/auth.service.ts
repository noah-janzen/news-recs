import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  ConfirmUserDto,
  CreateUserDto,
  LoginUserDto,
  ChangePasswordDto,
} from './dto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { DateUtil } from 'src/common/util/date-util';
import { User, UserDocument } from 'src/users/user.model';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private mailService: MailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Creates a new user, stores the user with the hashed password in the database and sends a confirmation link via email.
   * @param createUserDto user to sign up
   */
  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const confirmationToken = this.usersService.generateToken();
    const confirmationTokenTimestamp = new Date();

    let newUser;
    try {
      newUser = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
        confirmationToken,
        confirmationTokenTimestamp,
      });
    } catch (error) {
      if (this.usersService.emailAlreadyRegistered(error)) {
        throw new BadRequestException('EMAIL_ALREADY_REGISTERED');
      }
      throw error;
    }

    // this.mailService.sendUserConfirmation(newUser);

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
  async confirm(confirmUserDto: ConfirmUserDto) {
    let user;
    try {
      user = await this.usersService.findOne(confirmUserDto.email);
    } catch (error) {
      throw new BadRequestException('EMAIL_NOT_REGISTERED');
    }

    if (!user) {
      throw new BadRequestException('EMAIL_NOT_REGISTERED');
    }

    if (user.isConfirmed) {
      throw new BadRequestException('USER_ALREADY_CONFIRMED');
    }

    if (user.confirmationToken !== confirmUserDto.token) {
      throw new BadRequestException('TOKEN_INVALID');
    }

    if (this.isRegistrationPeriodExpired(user.confirmationTokenTimestamp)) {
      throw new BadRequestException('TOKEN_EXPIRED');
    }

    await this.usersService.confirm(confirmUserDto.email);
  }

  /**
   * Sends a new confirmation token to a user
   * @param loginUserDto user credentials
   */
  async renewConfirmationToken(loginUserDto: LoginUserDto) {
    const user = await this.validateCredentials(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (user.isConfirmed) {
      throw new BadRequestException('USER_ALREADY_CONFIRMED');
    }

    await this.usersService.renewConfirmationToken(user.id);

    await this.mailService.sendUserConfirmation(user);
  }

  /**
   * Signs in an user if the credentials are valid and the user is confirmed. Returns a pair of tokens and stores the hashed refresh token in the database
   * @param loginUserDto user credentials
   * @returns pair of tokens (access_token and refresh_token)
   */
  async signIn(loginUserDto: LoginUserDto): Promise<Tokens> {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const tokens = await this.getTokens(user);
    const hashedRefreshToken = await argon2.hash(tokens.refresh_token);
    await this.usersService.updateRefreshToken(user, hashedRefreshToken);

    return tokens;
  }

  /**
   * Logs out an user and deletes the refresh token hash from the database.
   * @param userId user id of the user to log out
   */
  async logout(userId: string) {
    const user = await this.usersService.findById(userId);
    await this.usersService.deleteRefreshToken(user);
  }

  /**
   * Refreshes the pair of tokens if the sent refresh token matches the stored refresh token in the database.
   * @param userId user id of the user who wants to refresh his tokens
   * @param refreshToken refresh token the user sent
   * @returns pair of new tokens (access_token and refresh_token)
   */
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('TOKEN_INVALID');

    const requestTokenCorrect = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!requestTokenCorrect) {
      await this.usersService.deleteRefreshToken(user);
      throw new UnauthorizedException('TOKEN_INVALID');
    }

    const newTokens = await this.getTokens(user);
    const hashedRefreshToken = await argon2.hash(newTokens.refresh_token);
    await this.usersService.updateRefreshToken(user, hashedRefreshToken);

    return newTokens;
  }

  /**
   * Sends a change password token to the user belonging to the passed email
   * @param email of the user
   */
  async sendChangePasswordToken(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user || !user.isConfirmed) {
      // do nothing in order to not reveal if an email is signed up or not
      return;
    }

    await this.usersService.createChangePasswordToken(user);
    await this.mailService.sendUserChangePasswordToken(user);
  }

  /**
   * Changes the password of an user iff the given token is not expired and valid
   * @param changePasswordDto change password data transfer object
   */
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOne(changePasswordDto.email);
    if (!user || !user.changePasswordToken) {
      throw new BadRequestException('EMAIL_OR_CHANGE_PASSWORD_TOKEN_INVALID');
    }

    // check if token is valid
    const tokenValid =
      user.changePasswordToken.toString() ===
      changePasswordDto.passwordChangeToken;
    if (!tokenValid) {
      throw new BadRequestException('CHANGE_PASSWORD_TOKEN_INVALID');
    }

    // check if token is expired
    const tokenExpired = this.isChangePasswordPeriodExpired(
      user.changePasswordTokenTimestamp,
    );
    if (tokenExpired) {
      throw new BadRequestException('CHANGE_PASSWORD_TOKEN_EXPIRED');
    }

    // change password
    const hashedPassword = await argon2.hash(changePasswordDto.newPassword);
    await this.usersService.changePassword(user, hashedPassword);
    await this.usersService.deleteChangePasswordToken(user);
  }

  /**
   * Helper method that checks whether the confirmation token timestamp is not expired
   * @param confirmationTokenTimestamp timestamp of the token creation
   * @returns true iff the timestamp is expired
   */
  private isRegistrationPeriodExpired(confirmationTokenTimestamp) {
    const registrationDate = new Date(confirmationTokenTimestamp.toString());
    const CONFIRMATION_PERIOD_IN_HOURS = this.configService.get<number>(
      'CONFIRMATION_PERIOD_IN_HOURS',
    );
    return !DateUtil.isInRange(registrationDate, CONFIRMATION_PERIOD_IN_HOURS);
  }

  /**
   * Helper method that checks whether the change password token timestamp is not expired
   * @param changePasswordTokenTimestamp timestamp of the token creation
   * @returns true iff the timestamp is expired
   */
  private isChangePasswordPeriodExpired(changePasswordTokenTimestamp) {
    const passwordChangeRequestDate = new Date(
      changePasswordTokenTimestamp.toString(),
    );
    const PASSWORD_CHANGE_PERIOD_IN_HOURS = this.configService.get<number>(
      'PASSWORD_CHANGE_PERIOD_IN_HOURS',
    );
    return !DateUtil.isInRange(
      passwordChangeRequestDate,
      PASSWORD_CHANGE_PERIOD_IN_HOURS,
    );
  }

  /**
   * Helper method that signs a new pair of tokens
   * @param user for whom the tokens are issued
   * @returns pair of tokens (access_token and refresh_token)
   */
  private async getTokens(user: User): Promise<Tokens> {
    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'at-secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'rt-secret',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * Helper method that checks whether the sent credentials are valid and whether the user has been confirmed
   * @param email of the user
   * @param password of the user
   * @returns the user iff the user is valid (credentials and confirmation)
   */
  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.validateCredentials(email, password);

    if (!user.isConfirmed) {
      throw new ForbiddenException('USER_NOT_CONFIRMED');
    }

    return user;
  }

  /**
   * Helper method that checks whether the sent credentials are valid
   * @param email of the user
   * @param password of the user
   * @returns the user iff the credentials are valid
   */
  private async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new ForbiddenException('USERNAME_OR_PASSWORD_INVALID');
    }

    const passwordCorrect = await argon2.verify(user.password, password);
    if (!passwordCorrect) {
      throw new ForbiddenException('USERNAME_OR_PASSWORD_INVALID');
    }

    return user;
  }
}
