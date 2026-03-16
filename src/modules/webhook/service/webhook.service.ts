import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DepositForm } from '../forms/DepositForm';
import { DepositoJaExistenteException } from '../exceptions/DepositoJaExistenteException';
import { UsuarioNaoEncontradoException } from 'src/modules/auth/exceptions/UsuarioNaoEncontradoException';
import { DepositoNaoGeradoException } from '../exceptions/DepositoNaoGeradoException';
import { CarteiraNaoEncontradaException } from 'src/shared/exceptions/CarteiraNaoEncontradaException';

@Injectable()
export class WebhoockService {
  constructor(private prisma: PrismaService) {}
  async deposito(form: DepositForm): Promise<void> {
    const usuario = await this.prisma.usuarios.findUnique({
      include: {
        carteira: {
          include: {
            saldo: true,
          },
        },
      },
      where: {
        id: form.userId,
      },
    });
    if (!usuario)
      throw new UsuarioNaoEncontradoException('Usuário não encontrado!');
    const carteira = usuario.carteira?.saldo.find((s) => s.tipo == form.token);
    if (!carteira)
      throw new CarteiraNaoEncontradaException('Carteira não encontrada');
    try {
      await this.prisma.$transaction(async (prisma) => {
        try {
          await prisma.deposito.create({
            data: {
              usuarioId: form.userId,
              token: form.token,
              amount: form.amount,
              idempotencyKey: form.idempotencyKey,
            },
          });
        } catch (e) {
          console.error(e);
          throw new DepositoJaExistenteException();
        }

        const feita = await prisma.saldo.update({
          where: { id: carteira.id },
          data: {
            quantidade: {
              increment: form.amount,
            },
          },
        });

        if (feita) {
          await prisma.movimentacao.create({
            data: {
              tipo: 'DEPOSIT',
              usuarioId: form.userId,
              token: form.token,
              valor: form.amount,
              saldoAnterior: carteira.quantidade,
              saldoNovo: feita.quantidade,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      throw new DepositoNaoGeradoException();
    }
  }
  async buscarUsuarios(): Promise<any[]> {
    const usuarios = await this.prisma.usuarios.findMany();
    return usuarios.map((u) => {
      return {
        id: u.id,
        nome: u.nome,
      };
    });
  }
}
