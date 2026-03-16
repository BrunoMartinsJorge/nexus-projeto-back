import jwt, { JwtPayload } from 'jsonwebtoken';
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
    const decoded: JwtPayload = jwt.decode(splited) as JwtPayload;
    if (!decoded) throw new TokenInvalidaException('Token inválido');
    return {
      id: Number(decoded.sub),
      email: decoded.email as string,
      nome: decoded.nome as string,
      espiraEm: decoded.exp as number,
    };
  }

  static validarToken(token: string): boolean {
    let splited: string = '';
    if (token.startsWith('Bearer ')) splited = token.split(' ')[1];
    else splited = token;
    try {
      jwt.verify(splited, process.env.JWT_ACCESS_SECRET!);
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  }

  static validarRefreshToken(token: string): boolean {
    let splited: string = '';
    if (token.startsWith('Bearer ')) splited = token.split(' ')[1];
    else splited = token;
    try {
      jwt.verify(splited, process.env.JWT_REFRESH_SECRET!);
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  }

  static gerarAccessToken(id: number, email: string, nome: string): string {
    return jwt.sign(
      {
        sub: id,
        email: email,
        nome: nome,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' },
    );
  }

  static gerarRefreshToken(id: number, email: string, nome: string): string {
    return jwt.sign(
      {
        sub: id,
        email: email,
        nome: nome,
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' },
    );
  }
}
