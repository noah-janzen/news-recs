import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.model';
import { CreateUserDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto & { confirmationToken: string }) {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  async findById(userId: string) {
    return await this.userModel.findById(userId).exec();
  }

  async confirm(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    user.isConfirmed = true;
    user.confirmationToken = null;
    user.confirmationTokenTimestamp = null;

    await user.save();
  }
}
