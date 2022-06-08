import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.model';
import { CreateUserDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user in the database
   * @param user to be stored
   * @returns the new user
   */
  async create(user: CreateUserDto & { confirmationToken: string }) {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  /**
   * Finds an user by his/her id
   * @param userId of the user to find
   * @returns the user
   */
  async findById(userId: string) {
    return this.userModel.findById(userId).exec();
  }

  /**
   * Finds an user by his/her email
   * @param email of the user to find
   * @returns the user
   */
  async findOne(email: string) {
    let user;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }

  /**
   * Confirms an user
   * @param userId of the user to be confirmed
   */
  async confirm(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    user.isConfirmed = true;
    user.confirmationToken = undefined;
    user.confirmationTokenTimestamp = undefined;

    await user.save();
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
}
