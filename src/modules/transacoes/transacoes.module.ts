import { Module } from '@nestjs/common';
import { TransacoesController } from './controller/transacoes.controller';
import { TokenService } from 'src/shared/services/Token.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TransacoesService } from './service/transacoes.service';

@Module({
  controllers: [TransacoesController],
  providers: [TransacoesService, TokenService, PrismaService],
  imports: [],
  exports: [TransacoesService],
})
export class TransacoesModule {}
