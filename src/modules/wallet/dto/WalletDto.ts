import { WalletBalanceDto } from './WalletBalanceDto';

export interface WalletDto {
  id: number;
  balance: WalletBalanceDto[];
}
