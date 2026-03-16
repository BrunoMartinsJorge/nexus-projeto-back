import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { usuarios } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UsuarioNaoEncontradoException } from '../exceptions/UsuarioNaoEncontradoException';
import { UsuarioJaCadastradoException } from '../exceptions/UsuarioJaCadastradoException';
import { TokenService } from 'src/shared/services/Token.service';
import fs from 'fs';
import { SaldoMockModel } from 'mock/SaldoMockModel';
import { LoginForm } from '../forms/LoginFormSchema';
import { RegistroForm } from '../forms/RegistroFormSchema';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  public async loginUsuario(form: LoginForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const usuario: usuarios | null = await this.prisma.usuarios.findUnique({
      where: {
        email: form.email,
      },
    });
    if (!usuario)
      throw new UsuarioNaoEncontradoException('Usuário não encontrado');
    if (!(await bcrypt.compare(form.senha, usuario.senha)))
      throw new UsuarioNaoEncontradoException('Usuário não encontrado');
    return {
      accessToken: TokenService.gerarAccessToken(
        usuario.id,
        usuario.email,
        usuario.nome,
      ),
      refreshToken: TokenService.gerarRefreshToken(
        usuario.id,
        usuario.email,
        usuario.nome,
      ),
    };
  }
  public async registrarUsuario(form: RegistroForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const senhaEncriptada = await bcrypt.hash(form.senha, 10);
    let usuario: usuarios | null = await this.prisma.usuarios.findUnique({
      where: {
        email: form.email,
      },
    });
    if (usuario)
      throw new UsuarioJaCadastradoException('Usuário já encontrado');
    usuario = await this.prisma.usuarios.create({
      data: {
        email: form.email,
        senha: senhaEncriptada,
        nome: form.nome,
        carteira: {
          create: {
            saldo: {
              create: [
                { quantidade: 0, tipo: 'BRL' },
                { quantidade: 0, tipo: 'BTC' },
                { quantidade: 0, tipo: 'ETH' },
              ],
            },
          },
        },
      },
    });
    this.gerarSaldo(usuario.id);
    return {
      accessToken: TokenService.gerarAccessToken(
        usuario.id,
        usuario.email,
        usuario.nome,
      ),
      refreshToken: TokenService.gerarRefreshToken(
        usuario.id,
        usuario.email,
        usuario.nome,
      ),
    };
  }
  refreshToken(refreshToken: string): string {
    const valido: any = TokenService.validarRefreshToken(refreshToken);
    if (!valido) throw new Error('Token inválido');
    const payload = TokenService.decodeToken(refreshToken);
    return TokenService.gerarAccessToken(
      payload.id,
      payload.email,
      payload.nome,
    );
    // const newAccessToken = jwt.sign(
    //   {
    //     sub: payload.id,
    //     email: payload.email,
    //     nome: payload.nome,
    //   },
    //   process.env.JWT_ACCESS_SECRET!,
    //   { expiresIn: '15m' },
    // );

    // return {
    //   access_token: newAccessToken,
    // };
  }
  gerarSaldo(userId: number): void {
    const saldos = fs.readFileSync('mock/SaldoMock.json', 'utf-8');
    const obj: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    const usuarios = obj.users;
    if (!usuarios || !usuarios.length) return;
    usuarios.push({ id: userId, saldo: 0 });
    const dados: SaldoMockModel = JSON.parse(saldos) as SaldoMockModel;
    fs.writeFileSync('mock/SaldoMock.json', JSON.stringify(dados));
  }
}
