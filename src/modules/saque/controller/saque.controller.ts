import { Body, Controller, Post, Req } from '@nestjs/common';
import { SaqueService } from '../service/saque.service';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';
import SaqueFormSchema from '../form/SaqueFormSchema';
import type { SaqueForm } from '../form/SaqueFormSchema';

@Controller('saque')
export class SaqueController {
  constructor(private service: SaqueService) {}
  @Post()
  async efetuarSaque(@Req() req: Request, @Body() body: SaqueForm) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    const form = await SaqueFormSchema.parseAsync(body);
    return await this.service.efetuarSaque(form, token.id);
  }
}
