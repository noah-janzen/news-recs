import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../users/user.model';

export class UserUpdateDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  readonly email?: string;

  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: Date;
}
