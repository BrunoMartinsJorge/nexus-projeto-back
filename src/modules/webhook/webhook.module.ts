import { Module } from '@nestjs/common';
import { WebhoockController } from './controller/webhook.controller';
import { WebhoockService } from './service/webhook.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TokenService } from 'src/shared/services/Token.service';

@Module({
  controllers: [WebhoockController],
  providers: [WebhoockService, TokenService, PrismaService],
  imports: [],
  exports: [WebhoockService],
})
export class WebhoockModule {}
