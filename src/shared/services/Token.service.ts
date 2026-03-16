/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { usuarios } from 'generated/prisma/client';
import jwt from 'jsonwebtoken';
import { TokenInvalidaException } from '../exceptions/TokenInvalidaException';

export class TokenService {
  static decodeToken(token: string): {
    id: number;
    email: string;
    nome: string;
    espiraEm: number;
  } {
    let splited: string = '';
    if (token.startsWith('Bearer ')) splited = token.split(' ')[1];
    else splited = token;
    const decoded: any = jwt.decode(splited);
    if (!decoded) throw new TokenInvalidaException('Token inválido');
    return {
      id: Number(decoded.sub),
      email: decoded.email,
      nome: decoded.nome,
      espiraEm: decoded.exp,
    };
  }

  static validarToken(token: string): boolean {
    let splited: string = '';
    if (token.startsWith('Bearer ')) splited = token.split(' ')[1];
    else splited = token;
    try {
      jwt.verify(splited, 'vMXnvqLLSan6piU6Z4XUmPFjU80PG0PGTxEzZVImxWL');
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  }
  static gerarAccessToken(user: usuarios): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        nome: user.nome,
      },
      'vMXnvqLLSan6piU6Z4XUmPFjU80PG0PGTxEzZVImxWL',
      { expiresIn: '15m' },
    );
  }
  static gerarRefreshToken(user: usuarios): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        nome: user.nome,
      },
      'vMXnvqLLSan6piU6Z4XUmPFjU80PG0PGTxEzZVImxWL',
      { expiresIn: '7d' },
    );
  }
}
