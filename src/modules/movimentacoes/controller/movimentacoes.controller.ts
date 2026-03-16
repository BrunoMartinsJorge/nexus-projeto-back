import { Controller, Get, Param, Req } from '@nestjs/common';
import { MovimentacoesService } from '../services/movimentacoes.service';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private service: MovimentacoesService) {}
  @Get('/pagina:pagina/limite:limite')
  async getMovimentacoes(
    @Param('pagina') pagina: number,
    @Param('limite') limite: number,
    @Req() req: Request,
  ) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return await this.service.listarMovimentacoesPaginadas(
      token.id,
      pagina,
      limite,
    );
  }
}
