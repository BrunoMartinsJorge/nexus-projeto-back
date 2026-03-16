import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SaqueForm } from '../form/SaqueFormSchema';
import { UsuarioNaoEncontradoException } from 'src/modules/auth/exceptions/UsuarioNaoEncontradoException';
import { tipo_valor } from 'generated/prisma/enums';
import fs from 'fs';
import { SaldoMockModel } from 'mock/SaldoMockModel';
import { CarteiraNaoEncontradaException } from 'src/shared/exceptions/CarteiraNaoEncontradaException';
import { ObjectNotFoundException } from 'src/shared/exceptions/ObjectNotFoundException';
import { IllegalAccessException } from 'src/shared/exceptions/IllegalAccessException';
import { SwapService } from 'src/modules/swap/services/swap.service';

@Injectable()
export class SaqueService {
  constructor(
    private prisma: PrismaService,
    private swapService: SwapService,
  ) {}
  async efetuarSaque(form: SaqueForm, userId: number): Promise<void> {
    const user = await this.prisma.usuarios.findUnique({
      where: { id: userId },
      include: { carteira: true },
    });

    if (!user)
      throw new UsuarioNaoEncontradoException('Usuário não encontrado');

    const carteira = user.carteira;
    if (!carteira)
      throw new CarteiraNaoEncontradaException('Carteira não encontrada');

    const saldo = await this.prisma.saldo.findFirst({
      where: {
        carteiraid: carteira.id,
        tipo: form.token as tipo_valor,
      },
    });

    if (!saldo) throw new ObjectNotFoundException('Saldo não encontrado');

    const novoSaldo = Number(saldo.quantidade) - form.amount;

    await this.prisma.$transaction(async (prisma) => {
      const result = await prisma.saldo.updateMany({
        where: {
          id: saldo.id,
          quantidade: {
            gt: form.amount,
          },
        },
        data: {
          quantidade: {
            decrement: form.amount,
          },
        },
      });

      if (result.count === 0)
        throw new IllegalAccessException('Saldo insuficiente');

      await prisma.movimentacao.create({
        data: {
          usuarioId: user.id,
          tipo: 'WITHDRAWAL',
          token: form.token as tipo_valor,
          valor: form.amount,
          saldoAnterior: saldo.quantidade,
          saldoNovo: novoSaldo,
        },
      });

      await prisma.transacao.create({
        data: {
          tipo: 'WITHDRAWAL',
          carteiraId: carteira.id,
          tokenFrom: form.token as tipo_valor,
          tokenTo: form.token as tipo_valor,
          valorFrom: form.amount,
          valorTo: form.amount,
          taxa: 0,
        },
      });
    });

    const cotacao = await this.swapService.calcularCotacao({
      amount: form.amount,
      tokenFrom: form.token as tipo_valor,
      tokenTo: 'BRL',
    });

    this.depositarSalvo(userId, cotacao.quantidadeDestino);
  }

  public getSaldos(id: number): number | null {
    const saldos = fs.readFileSync('mock/SaldoMock.json', 'utf-8');
    const obj: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    const usuarios = obj.users;
    if (!usuarios || !usuarios.length) return null;
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return null;
    return usuario.saldo;
  }

  public depositarSalvo(id: number, valor: number): void {
    const saldos = fs.readFileSync('mock/SaldoMock.json', 'utf-8');
    const obj: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    const usuarios = obj.users;
    if (!usuarios || !usuarios.length) return;
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return;
    const dados: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    usuario.saldo = usuario.saldo + valor;
    dados.users.map((u) => {
      if (u.id === id) u.saldo = u.saldo + valor;
    });
    fs.writeFileSync('mock/SaldoMock.json', JSON.stringify(dados));
  }
}
