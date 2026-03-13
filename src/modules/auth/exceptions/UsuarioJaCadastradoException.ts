import { HttpException } from '@nestjs/common';

export class UsuarioJaCadastradoException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Usuário já encontrado', 400);
  }
}
