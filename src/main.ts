import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.URL_FRONT);
  app.enableCors({
    origin: [process.env.URL_FRONT],
    credentials: true,
  });
  const authMiddleware = new AuthMiddleware();
  app.use(authMiddleware.use.bind(authMiddleware));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
