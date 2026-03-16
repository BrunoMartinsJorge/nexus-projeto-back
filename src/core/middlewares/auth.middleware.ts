import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from 'src/shared/services/Token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.url.startsWith('/auth')) {
      next();
      return;
    }
    const token: string = req.headers['authorization'] as string;
    if (!token) res.status(401).json({ message: 'Token não encontrado!' });
    const payload = TokenService.decodeToken(token);
    if (!payload) res.status(401).json({ message: 'Token inválido!' });
    if (!TokenService.validarToken(token))
      res.status(401).json({ message: 'Token inválido!' });
    next();
  }
}
