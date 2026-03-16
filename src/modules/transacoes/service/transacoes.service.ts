import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TransacaoDto } from '../dto/TransacaoDto';
import { CarteiraNaoEncontradaException } from 'src/shared/exceptions/CarteiraNaoEncontradaException';

@Injectable()
export class TransacoesService {
  constructor(private prisma: PrismaService) {}
  async getTransacoes(
    id: number,
    limite: number,
    pagina: number,
  ): Promise<TransacaoDto> {
    const carteira = await this.prisma.carteira.findUnique({
      where: { usuarioId: id },
    });
    if (!carteira)
      throw new CarteiraNaoEncontradaException('Carteira não encontrada');
    const total = await this.prisma.transacao.count({
      where: { carteiraId: carteira.id },
    });
    const pageNumber = Math.max(Number(pagina) || 1, 1);
    const limitNumber = Math.max(Number(limite) || 10, 1);

    const transacoes = await this.prisma.transacao.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      where: { carteiraId: carteira.id },
      orderBy: {
        dataHora: 'desc',
      },
    });
    return {
      limit: limitNumber,
      page: pagina,
      total: total,
      totalPages: Math.ceil(total / limitNumber),
      data: transacoes.map((transacao) => {
        return {
          id: transacao.id,
          tipo: transacao.tipo as 'DEPOSITO' | 'SWAP' | 'WITHDRAWAL',
          tokenFrom: transacao.tokenFrom?.toString() || '',
          tokenTo: transacao.tokenTo?.toString() || '',
          valorFrom: Number(transacao.valorFrom),
          valorTo: Number(transacao.valorTo),
          taxa: Number(transacao.taxa),
          dataHora: transacao.dataHora.toISOString(),
        };
      }),
    };
  }
}
