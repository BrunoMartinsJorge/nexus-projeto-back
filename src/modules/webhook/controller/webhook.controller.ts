import { Body, Controller, Get, Post } from '@nestjs/common';
import type { DepositForm } from '../forms/DepositFormSchema';
import { WebhoockService } from '../service/webhook.service';
import DepositFormSchema from '../forms/DepositFormSchema';

@Controller('webhook')
export class WebhoockController {
  constructor(private service: WebhoockService) {}
  @Post('/deposit')
  async simularDeposito(@Body() body: DepositForm) {
    const form = DepositFormSchema.parse(body);
    return this.service.deposito(form);
  }
  @Get('/usuarios')
  async buscarUsuariosParaSimularDeposito() {
    return this.service.buscarUsuarios();
  }
}
