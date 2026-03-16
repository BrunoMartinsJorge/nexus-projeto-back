import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { MovimentacoesDto } from '../dto/MovimentacoesDto';

@Injectable()
export class MovimentacoesService {
  constructor(private prisma: PrismaService) {}
  async listarMovimentacoesPaginadas(
    userId: number,
    page: number,
    limit: number,
  ): Promise<MovimentacoesDto> {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const movimentacoes = await this.prisma.movimentacao.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      where: {
        usuarioId: userId,
      },
      orderBy: {
        dataHora: 'desc',
      },
    });
    const totalItens: number = await this.prisma.movimentacao.count({
      where: {
        usuarioId: userId,
      },
    });
    return {
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalItens / limit),
      total: totalItens,
      data: movimentacoes.map((movimentacao) => {
        return {
          id: movimentacao.id,
          tipo: movimentacao.tipo,
          token: movimentacao.token,
          valor: Number(movimentacao.valor),
          saldoNovo: Number(movimentacao.saldoNovo),
          saldoAnterior: Number(movimentacao.saldoAnterior),
          dataHora: movimentacao.dataHora.toISOString(),
        };
      }),
    };
  }
}
