export interface MovimentacoesDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    tipo: string;
    token: string;
    valor: number;
    saldoAnterior: number;
    saldoNovo: number;
    dataHora: string;
  }[];
}
