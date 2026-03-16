import { Module } from '@nestjs/common';
import { MovimentacoesController } from './controller/movimentacoes.controller';
import { MovimentacoesService } from './services/movimentacoes.service';
import { TokenService } from 'src/shared/services/Token.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService, TokenService, PrismaService],
  imports: [],
  exports: [MovimentacoesService],
})
export class MovimentacoesModule {}
