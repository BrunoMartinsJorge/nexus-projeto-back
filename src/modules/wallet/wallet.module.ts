import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { TokenService } from 'src/shared/services/Token.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, TokenService],
  exports: [WalletService],
  imports: [PrismaModule],
})
export class WalletModule {}
