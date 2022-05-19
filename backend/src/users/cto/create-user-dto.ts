import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { Date } from 'mongoose';
import { Gender } from '../user.model';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsDateString()
  readonly dateOfBirth: Date;

  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  @Length(5, 5)
  readonly postalCode: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;
}
