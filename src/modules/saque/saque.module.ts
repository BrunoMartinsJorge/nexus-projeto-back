import { Module } from '@nestjs/common';
import { SaqueController } from './controller/saque.controller';
import { SaqueService } from './service/saque.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TokenService } from 'src/shared/services/Token.service';
import { SwapService } from '../swap/services/swap.service';

@Module({
  controllers: [SaqueController],
  providers: [SaqueService, TokenService, PrismaService, SwapService],
  imports: [],
  exports: [SaqueService],
})
export class SaqueModule {}
