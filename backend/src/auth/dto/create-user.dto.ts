import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Date } from 'mongoose';
import { Gender, Language } from '../../users/user.model';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly lastName: string;

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
  @MaxLength(40)
  readonly city: string;

  @IsEnum(Language)
  readonly language: Language;
}
