import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/exceptions/HttpExceptionFilter';
import { WalletModule } from './modules/wallet/wallet.module';
import { WebhoockModule } from './modules/webhook/webhook.module';
import { SwapModule } from './modules/swap/swap.module';
import { MovimentacoesModule } from './modules/movimentacoes/movimentacoes.module';
import { SaqueModule } from './modules/saque/saque.module';
import { TransacoesModule } from './modules/transacoes/transacoes.module';

@Module({
  imports: [
    AuthModule,
    WalletModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WalletModule,
    WebhoockModule,
    SwapModule,
    MovimentacoesModule,
    SaqueModule,
    TransacoesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
