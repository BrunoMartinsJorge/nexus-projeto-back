import { HttpException } from '@nestjs/common';

export class TokenNaoEncontradaException extends HttpException {
  constructor() {
    super('Token não encontrado', 404);
  }
}
