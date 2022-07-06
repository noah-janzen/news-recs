import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class ConfirmUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly token: string;
}
