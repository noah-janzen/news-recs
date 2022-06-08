import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @MaxLength(40)
  readonly email: string;

  @IsNotEmpty()
  readonly passwordResetToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly newPassword: string;
}
