import { Model } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.model';
import { CreateUserDto } from 'src/auth/dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user in the database
   * @param user to be stored
   * @returns the new user
   */
  async create(
    user: CreateUserDto & {
      confirmationToken: string;
      confirmationTokenTimestamp: Date;
    },
  ) {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  /**
   * Finds an user by his/her id
   * @param userId of the user to find
   * @returns the user
   */
  findById(userId: string) {
    return this.userModel.findById(userId).exec();
  }

  /**
   * Finds an user by his/her email
   * @param email of the user to find
   * @returns the user
   */
  findOne(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Confirms an user
   * @param email of the user to be confirmed
   */
  async confirm(email: string) {
    const user = await this.findOne(email);

    user.isConfirmed = true;
    user.confirmationToken = undefined;
    user.confirmationTokenTimestamp = undefined;

    await user.save();
  }

  async renewConfirmationToken(userId: string) {
    const user = await this.findById(userId);

    user.confirmationToken = this.generateToken();
    user.confirmationTokenTimestamp = new Date();
    user.save();

    return user.confirmationToken;
  }

  /**
   * Stores the hashed refresh token to the passed user
   * @param user to be updated
   * @param hashedRefreshToken hash of the refresh token
   */
  async updateRefreshToken(user: UserDocument, hashedRefreshToken: string) {
    user.refreshToken = hashedRefreshToken;
    await user.save();
  }

  /**
   * Deletes the refresh token from the passed user
   * @param user to be updated
   */
  async deleteRefreshToken(user: UserDocument) {
    user.refreshToken = null;
    await user.save();
  }

  /**
   * Creates a change password token and stores it with its timestamp in the database
   * @param user to create the token for
   */
  async createChangePasswordToken(user: UserDocument) {
    user.changePasswordToken = this.generateToken();
    user.changePasswordTokenTimestamp = new Date();
    await user.save();
  }

  /**
   * Changes the password of an user
   * @param user to change the password for
   * @param password hash of the password
   */
  async changePassword(user: UserDocument, password: string) {
    user.password = password;
    await user.save();
  }

  /**
   * Deletes the change password token and its timestamp from the database.
   * @param user to delete the token for
   */
  async deleteChangePasswordToken(user: UserDocument) {
    user.changePasswordToken = undefined;
    user.changePasswordTokenTimestamp = undefined;
    await user.save();
  }

  async getOwnUser(userId: string) {
    const user = await this.findById(userId);
    return {
      id: user.id,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      email: user.email,
      registrationTimestamp: user.registrationTimestamp,
    };
  }

  async updateUser(userId: string, userUpdate: UserUpdateDto) {
    const user = await this.findById(userId);

    try {
      if (userUpdate.dateOfBirth) user.dateOfBirth = userUpdate.dateOfBirth;
      if (userUpdate.gender) user.gender = userUpdate.gender;
      if (userUpdate.email) user.email = userUpdate.email;

      await user.save();
    } catch (error) {
      if (this.emailAlreadyRegistered(error)) {
        throw new BadRequestException('EMAIL_ALREADY_REGISTERED');
      }
      throw error;
    }

    return this.getOwnUser(user.id);
  }

  /**
   * Helper method to generate a token
   * @returns generated token
   */
  generateToken(digits = 6) {
    let randomNumber = 0;
    do {
      randomNumber = Math.floor(Math.random() * 10 ** digits);
    } while (randomNumber < 10 ** (digits - 1));

    return randomNumber.toString();
  }

  getGroup(userId: string) {
    // ObjectId is a 12-byte hexadezimal number (24 digits)
    // A 4-byte timestamp
    // A 5-byte random value
    // A 3-byte incrementing counter, initialized to a random value.
    const userCounter = parseInt(userId.slice(18, 24), 16);
    const numberOfGroups = 2;
    return userCounter % numberOfGroups;
  }

  /**
   * Helper method that evaluates whether the email has already been registered
   * @param error MongoDB error
   * @returns true iff the email has already been registered
   */
  emailAlreadyRegistered(error) {
    return error.code === 11000 && error.keyPattern.email === 1;
  }
}
