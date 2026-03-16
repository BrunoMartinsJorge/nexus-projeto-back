import { tipo_valor } from 'generated/prisma/enums';

export interface DepositForm {
  token: tipo_valor;
  amount: number;
  idempotencyKey: string;
  userId: number;
}
