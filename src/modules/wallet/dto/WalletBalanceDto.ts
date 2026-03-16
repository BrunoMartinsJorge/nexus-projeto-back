import { saldoGetPayload } from 'generated/prisma/models';

export class WalletBalanceDto {
  id: number;
  tipo: string;
  saldo: number;

  constructor(wallet: saldoGetPayload<object>) {
    this.id = wallet.id;
    this.saldo = Number(wallet.quantidade.toFixed(2));
    this.tipo = wallet.tipo;
  }
}
