import { Body, Controller, Post, Req } from '@nestjs/common';
import { SwapService } from '../services/swap.service';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';
import type { CotasaoForm } from '../form/CotasaoFormSchema';
import CotasaoFormSchema from '../form/CotasaoFormSchema';

@Controller('swap')
export class SwapController {
  constructor(private service: SwapService) {}
  @Post('/cota')
  async calcularCotacao(@Body() body: CotasaoForm) {
    const form = await CotasaoFormSchema.parseAsync(body);
    return await this.service.calcularCotacao(form);
  }
  @Post('/efetuar-swap')
  async efetuarSwap(@Body() body: CotasaoForm, @Req() req: Request) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    const form = await CotasaoFormSchema.parseAsync(body);
    return await this.service.efetuarSwap(form, token.id);
  }
}
