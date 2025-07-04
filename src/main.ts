import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './common/transform.interceptor';

@Injectable()
class NoCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');
    response.setHeader('Surrogate-Control', 'no-store');

    return next.handle();
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/audiencia');

  app.useGlobalInterceptors(new NoCacheInterceptor(), new TransformInterceptor());
  app.useGlobalPipes();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
