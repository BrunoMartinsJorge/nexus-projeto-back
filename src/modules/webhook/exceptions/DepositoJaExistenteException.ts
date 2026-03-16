import { HttpException } from '@nestjs/common';

export class DepositoJaExistenteException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Deposito já existente', 400);
  }
}
