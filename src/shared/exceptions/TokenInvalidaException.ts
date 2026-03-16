import { HttpException } from '@nestjs/common';

export class TokenInvalidaException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Token inválido', 401);
  }
}
