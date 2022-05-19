import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export enum Gender {
  M = 'M',
  W = 'W',
  D = 'D',
}

export enum Role {
  READER = 'READER',
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

  @Prop({
    type: Date,
    default: new Date(),
  })
  confirmationTokenTimestamp: Date;

  @Prop()
  confirmationToken: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({
    required: true,
    type: [String],
    enum: Role,
    default: [Role.READER],
  })
  roles: Role[];

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
}

export const UserSchema = SchemaFactory.createForClass(User);
