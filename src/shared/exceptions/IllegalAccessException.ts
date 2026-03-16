import { HttpException } from '@nestjs/common';

export class IllegalAccessException extends HttpException {
  constructor(message: string) {
    super(message, 403);
  }
}
