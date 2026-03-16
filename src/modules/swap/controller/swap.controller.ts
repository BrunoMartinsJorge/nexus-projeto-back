import { Body, Controller, Post, Req } from '@nestjs/common';
import { SwapService } from '../services/swap.service';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';
import CotacaoFormSchema from '../form/CotacaoFormSchema';
import type { CotacaoForm } from '../form/CotacaoFormSchema';

@Controller('swap')
export class SwapController {
  constructor(private service: SwapService) {}
  @Post('/cota')
  async calcularCotacao(@Body() body: CotacaoForm) {
    const form = await CotacaoFormSchema.parseAsync(body);
    return await this.service.calcularCotacao(form);
  }
  @Post('/efetuar-swap')
  async efetuarSwap(@Body() body: CotacaoForm, @Req() req: Request) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    const form = await CotacaoFormSchema.parseAsync(body);
    return await this.service.efetuarSwap(form, token.id);
  }
}
