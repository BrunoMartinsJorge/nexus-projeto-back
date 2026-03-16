import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpExceptionFilter } from 'src/shared/exceptions/HttpExceptionFilter';
import LoginFormSchema from '../forms/LoginFormSchema';
import type { LoginForm } from '../forms/LoginFormSchema';
import RegistroFormSchema from '../forms/RegistroFormSchema';
import type { RegistroForm } from '../forms/RegistroFormSchema';

@Controller('/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/login')
  @UseFilters(HttpExceptionFilter)
  async login(@Body() body: LoginForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const form = LoginFormSchema.parse(body);
    return await this.service.loginUsuario(form);
  }
  @Post('/registro')
  @UseFilters(HttpExceptionFilter)
  async registro(@Body() body: RegistroForm): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const form = await RegistroFormSchema.parseAsync(body);
    return await this.service.registrarUsuario(form);
  }
  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.service.refreshToken(body.refreshToken);
  }
}
