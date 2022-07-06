import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @MaxLength(40)
  readonly email: string;

  @IsNotEmpty()
  readonly passwordChangeToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  readonly newPassword: string;
}
