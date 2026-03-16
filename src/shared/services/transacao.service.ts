import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { tipo_valor } from 'generated/prisma/enums';

@Injectable()
export class TransacaoService {
  constructor(private prisma: PrismaService) {}
  async salvarTransacao(
    tipo: 'DEPOSITO' | 'SWAP' | 'WITHDRAWAL',
    carteiraId: number,
    tokenFrom: string,
    tokenTo: string,
    valorFrom: number,
    valorTo: number,
    taxa?: number,
  ) {
    await this.prisma.transacao.create({
      data: {
        tipo: tipo,
        carteiraId: carteiraId,
        tokenFrom: tokenFrom as tipo_valor,
        tokenTo: tokenTo as tipo_valor,
        valorFrom: valorFrom,
        valorTo: valorTo,
        taxa: taxa || 0,
      },
    });
  }
}
