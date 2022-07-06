import { IsEmail, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  readonly email: string;
}
