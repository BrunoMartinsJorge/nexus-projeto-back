import { saldo } from 'generated/prisma/browser';
import { WalletBalanceDto } from './WalletBalanceDto';
import { carteiraGetPayload } from 'generated/prisma/models';

export class WalletDto {
  id: number;
  balance: WalletBalanceDto[];
  constructor(wallet: carteiraGetPayload<object>, saldo: saldo[]) {
    this.id = wallet.id;
    this.balance = saldo.map((s) => new WalletBalanceDto(s));
  }
}
