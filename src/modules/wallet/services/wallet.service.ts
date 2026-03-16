import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { WalletDto } from '../dto/WalletDto';
import fs from 'fs';
import { SaldoMockModel } from 'mock/SaldoMockModel';
import { UsuarioNaoEncontradoException } from 'src/modules/auth/exceptions/UsuarioNaoEncontradoException';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}
  async getWallet(id: number): Promise<WalletDto | null> {
    const wallet = await this.prisma.usuarios.findUnique({
      where: { id },
      include: {
        carteira: {
          include: {
            saldo: true,
          },
        },
      },
    });
    const carteira = wallet?.carteira;

    if (!carteira) {
      return null;
    }

    return {
      id: carteira.id,
      balance: carteira.saldo.map((s) => ({
        id: s.id,
        tipo: s.tipo as string,
        saldo: Number(s.quantidade),
      })),
    };
  }
  public getSaldos(id: number): number {
    const saldos = fs.readFileSync('mock/SaldoMock.json', 'utf-8');
    const obj: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    const usuarios = obj.users;
    if (!usuarios || !usuarios.length)
      throw new UsuarioNaoEncontradoException('Usuário não encontrado');
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario)
      throw new UsuarioNaoEncontradoException('Usuário não encontrado');
    return usuario.saldo;
  }

  getSaldo(id: number): { saldo: number } {
    return {
      saldo: Number(this.getSaldos(id).toFixed(2)),
    };
  }
}
