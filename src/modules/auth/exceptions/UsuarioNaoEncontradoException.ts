import { HttpException } from '@nestjs/common';

export class UsuarioNaoEncontradoException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Usuário não encontrado', 404);
  }
}
