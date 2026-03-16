import { Controller, Get, Param, Req } from '@nestjs/common';
import { TransacoesService } from '../service/transacoes.service';
import { TokenService } from 'src/shared/services/Token.service';
import type { Request } from 'express';
import { TransacaoDto } from '../dto/TransacaoDto';

@Controller('transacoes')
export class TransacoesController {
  constructor(private service: TransacoesService) {}
  @Get('/pagina:pagina/limite:limite')
  async getTransacoes(
    @Req() req: Request,
    @Param('pagina') pagina: number,
    @Param('limite') limite: number,
  ): Promise<TransacaoDto> {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return await this.service.getTransacoes(token.id, limite, pagina);
  }
}
