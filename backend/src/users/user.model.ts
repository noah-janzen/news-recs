import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  M = 'M',
  W = 'W',
  D = 'D',
}

// ISO 639-1: two-letter codes
export enum Language {
  EN = 'EN',
  DE = 'DE',
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

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

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

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({
    required: true,
    type: String,
    enum: Language,
  })
  language: Language;

  @Prop()
  passwordResetToken: number;

  @Prop({ type: Date })
  passwordResetTokenTimestamp: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
