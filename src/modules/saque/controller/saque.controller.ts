import { Body, Controller, Post, Req } from '@nestjs/common';
import { SaqueService } from '../service/saque.service';
import type { Request } from 'express';
import type { SaqueForm } from '../form/SaqueForm';
import { TokenService } from 'src/shared/services/Token.service';

@Controller('saque')
export class SaqueController {
  constructor(private service: SaqueService) {}
  @Post()
  async efetuarSaque(@Req() req: Request, @Body() form: SaqueForm) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return await this.service.efetuarSaque(form, token.id);
  }
}
