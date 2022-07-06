import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;

  @IsEnum(Gender)
  readonly gender: Gender;

  @IsDateString()
  readonly dateOfBirth: Date;

  @IsEnum(Language)
  readonly language: Language;
}
