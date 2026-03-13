/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { usuarios } from 'generated/prisma/client';
import jwt from 'jsonwebtoken';

export class TokenService {
  static decodeToken(token: string): {
    id: number;
    email: string;
    nome: string;
  } {
    let splited: string = '';
    if (token.startsWith('Bearer ')) splited = token.split(' ')[1];
    else splited = token;
    //if (!TokenService.validarToken(splited)) return null;
    const decoded: any = jwt.decode(splited);
    if (!decoded) throw new Error('Token inválido');
    console.log(jwt.decode(splited));
    return {
      id: Number(decoded.sub),
      email: decoded.email,
      nome: decoded.nome,
    };
  }

  static validarToken(token: string): boolean {
    try {
      jwt.verify(token, 'vMXnvqLLSan6piU6Z4XUmPFjU80PG0PGTxEzZVImxWL');
      return true;
    } catch (error: any) {
      console.log(error);
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
      'ACCESS_SECRET',
      { expiresIn: '15m' },
    );
  }
  static gerarRefreshToken(user: usuarios): string {
    return jwt.sign(
      {
        sub: user.id,
      },
      'REFRESH_SECRET',
      { expiresIn: '7d' },
    );
  }
}
