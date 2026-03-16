import { Controller, Get, Req } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import type { Request } from 'express';
import { TokenService } from 'src/shared/services/Token.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private service: WalletService,
    private tokenService: TokenService,
  ) {}
  @Get('/')
  getWallet(@Req() req: Request) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return this.service.getWallet(token.id);
  }
  @Get('/saldo')
  getSaldo(@Req() req: Request) {
    const token = TokenService.decodeToken(req.headers.authorization || '');
    return this.service.getSaldo(token.id);
  }
}
