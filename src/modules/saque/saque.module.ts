import { Module } from '@nestjs/common';
import { SaqueController } from './controller/saque.controller';
import { SaqueService } from './service/saque.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TokenService } from 'src/shared/services/Token.service';

@Module({
  controllers: [SaqueController],
  providers: [SaqueService, TokenService, PrismaService],
  imports: [],
  exports: [SaqueService],
})
export class SaqueModule {}
