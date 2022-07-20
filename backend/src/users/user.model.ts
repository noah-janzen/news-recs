import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  M = 'M',
  W = 'W',
  D = 'D',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: Date,
    default: new Date(),
  })
  registrationTimestamp: Date;

  @Prop({
    required: true,
    default: false,
  })
  isConfirmed: boolean;

  @Prop({ type: Date })
  confirmationTokenTimestamp: Date;

  @Prop()
  confirmationToken: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({
    required: true,
    type: String,
    enum: Gender,
  })
  gender: Gender;

  @Prop({
    required: true,
    type: Date,
  })
  dateOfBirth: Date;

  @Prop()
  changePasswordToken: string;

  @Prop({ type: Date })
  changePasswordTokenTimestamp: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
