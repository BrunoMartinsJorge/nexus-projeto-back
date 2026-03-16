import { tipo_valor } from 'generated/prisma/enums';

export interface CotasaoForm {
  tokenFrom: tipo_valor;
  tokenTo: tipo_valor;
  amount: number;
}
