import { HttpException, HttpStatus } from '@nestjs/common';

export class ConfirmationFailedException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.OK,
        error: message,
      },
      HttpStatus.OK,
    );
  }
}
