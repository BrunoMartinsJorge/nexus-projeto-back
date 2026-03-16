import { Body, Controller, Get, Post } from '@nestjs/common';
import type { DepositForm } from '../forms/DepositForm';
import { WebhoockService } from '../service/webhook.service';

@Controller('webhook')
export class WebhoockController {
  constructor(private service: WebhoockService) {}
  @Post('/deposit')
  async simularDeposito(@Body() body: DepositForm) {
    return this.service.deposito(body);
  }
  @Get('/usuarios')
  async buscarUsuariosParaSimularDeposito() {
    return this.service.buscarUsuarios();
  }
}
