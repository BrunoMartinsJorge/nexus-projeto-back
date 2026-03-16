import { HttpException } from '@nestjs/common';

export class CarteiraNaoEncontradaException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Não foi possivel encontrar a carteira!', 404);
  }
}
