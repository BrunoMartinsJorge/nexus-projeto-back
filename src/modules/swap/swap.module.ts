import { Module } from '@nestjs/common';
import { SwapController } from './controller/swap.controller';
import { SwapService } from './services/swap.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { TransacaoService } from 'src/shared/services/transacao.service';

@Module({
  controllers: [SwapController],
  providers: [SwapService, TransacaoService],
  exports: [SwapService],
  imports: [PrismaModule],
})
export class SwapModule {}
