/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import type { CotasaoForm } from '../form/CotasaoForm';
import { CotasaoDto } from '../dto/CotasaoDto';
import { UsuarioNaoEncontradoException } from 'src/modules/auth/exceptions/UsuarioNaoEncontradoException';

@Injectable()
export class SwapService {
  constructor(private prisma: PrismaService) {}
  private readonly API_URL = 'https://api.coingecko.com/api/v3/simple/price?';
  private readonly coinsIds = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
  };
  private readonly coinsVsCurrencies = {
    BTC: 'btc',
    ETH: 'eth',
    BRL: 'brl',
  };
  async calcularCotacao(form: CotasaoForm): Promise<CotasaoDto> {
    const from = this.coinsIds[form.tokenFrom] ?? this.coinsIds[form.tokenTo];
    const to = this.coinsVsCurrencies[form.tokenTo];

    if (form.tokenFrom === form.tokenTo)
      throw new Error('Tokens devem ser diferentes');

    const url = `${this.API_URL}ids=${from}&vs_currencies=${to}`;

    const response = await fetch(url);
    const data = await response.json();

    const preco = data[from][to];

    const bruto = form.amount * preco;
    const taxa = bruto * 0.015;
    const liquido = bruto - taxa;

    return {
      cotasao: preco,
      quantidadeDestino: liquido,
      taxa,
    };
  }
  async efetuarSwap(form: CotasaoForm, userId: number): Promise<void> {
    const user = await this.prisma.usuarios.findUnique({
      where: { id: userId },
      include: {
        carteira: {
          include: {
            saldo: true,
          },
        },
      },
    });

    if (!user)
      throw new UsuarioNaoEncontradoException(
        'Usuário com ID: ' + userId + ' não encontrado.',
      );

    const carteira = user.carteira;
    if (!carteira) throw new Error('Carteira não encontrada');

    const saldos = carteira.saldo;
    const cotacao = await this.calcularCotacao(form);
    const saldoFrom = saldos.find((s) => s.tipo === form.tokenFrom);
    const saldoTo = saldos.find((s) => s.tipo === form.tokenTo);

    if (!saldoFrom)
      throw new Error('Usuário não possui saldo em ' + form.tokenFrom);

    if (!saldoTo)
      throw new Error('Usuário não possui saldo em ' + form.tokenTo);

    const totalDebito = form.amount;

    if (Number(saldoFrom.quantidade) < totalDebito)
      throw new Error('Saldo insuficiente');

    await this.prisma.$transaction(async (prisma) => {
      const result = await prisma.saldo.updateMany({
        where: {
          id: saldoFrom.id,
          quantidade: {
            gte: totalDebito,
          },
        },
        data: {
          quantidade: {
            decrement: totalDebito,
          },
        },
      });

      if (result.count === 0) throw new Error('Saldo insuficiente');

      const saldoFromDepois = await prisma.saldo.findUnique({
        where: { id: saldoFrom.id },
      });

      await prisma.movimentacao.create({
        data: {
          usuarioId: user.id,
          tipo: 'SWAP_OUT',
          token: form.tokenFrom,
          valor: form.amount,
          saldoAnterior: saldoFrom.quantidade,
          saldoNovo: saldoFromDepois!.quantidade,
        },
      });

      const saldoToDepois = await prisma.saldo.update({
        where: { id: saldoTo.id },
        data: {
          quantidade: {
            increment: cotacao.quantidadeDestino,
          },
        },
      });

      await prisma.movimentacao.create({
        data: {
          usuarioId: user.id,
          tipo: 'SWAP_IN',
          token: form.tokenTo,
          valor: cotacao.quantidadeDestino,
          saldoAnterior: saldoTo.quantidade,
          saldoNovo: saldoToDepois.quantidade,
        },
      });

      await prisma.movimentacao.create({
        data: {
          usuarioId: user.id,
          tipo: 'SWAP_FEE',
          token: form.tokenTo,
          valor: cotacao.taxa,
          saldoAnterior: saldoToDepois.quantidade,
          saldoNovo: saldoToDepois.quantidade,
        },
      });

      await prisma.transacao.create({
        data: {
          tipo: 'SWAP',
          carteiraId: user.carteira!.id,
          tokenFrom: form.tokenFrom,
          tokenTo: form.tokenTo,
          valorFrom: form.amount,
          valorTo: cotacao.quantidadeDestino,
          taxa: cotacao.taxa,
        },
      });
    });
  }
}
