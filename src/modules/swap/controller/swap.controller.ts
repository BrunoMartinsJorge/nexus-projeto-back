import { Body, Controller, Post, Req } from '@nestjs/common';
import { SwapService } from '../services/swap.service';
import type { CotasaoForm } from '../form/CotasaoForm';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';

@Controller('swap')
export class SwapController {
  constructor(private service: SwapService) {}
  @Post('/cota')
  async calcularCotacao(@Body() form: CotasaoForm) {
    return await this.service.calcularCotacao(form);
  }
  @Post('/efetuar-swap')
  async efetuarSwap(@Body() form: CotasaoForm, @Req() req: Request) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return await this.service.efetuarSwap(form, token.id);
  }
}
