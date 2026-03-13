import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import type { LoginForm } from '../forms/LoginForm';
import { AuthService } from '../services/auth.service';
import { HttpExceptionFilter } from 'src/shared/exceptions/HttpExceptionFilter';
import type { RegistroForm } from '../forms/RegistroForm';

@Controller('/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/login')
  @UseFilters(HttpExceptionFilter)
  async login(@Body() form: LoginForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.service.loginUsuario(form);
  }
  @Post('/registro')
  @UseFilters(HttpExceptionFilter)
  async registro(@Body() form: RegistroForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.service.registrarUsuario(form);
  }
}
