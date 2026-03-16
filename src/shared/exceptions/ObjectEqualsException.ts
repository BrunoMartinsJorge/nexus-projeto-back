import { HttpException } from '@nestjs/common';

export class ObjectEqualsException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}
