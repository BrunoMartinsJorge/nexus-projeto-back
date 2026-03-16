import { HttpException } from '@nestjs/common';

export class ObjectNotFoundException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Não foi possivel encontrar o objeto!', 404);
  }
}
