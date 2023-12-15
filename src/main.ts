import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new AuthenticationMiddleware())
  // This won't work b/c we'd need to pass in request service (we don't have access to di container)
  // app.useGlobalPipes(new FreezePipe()) // Since there are no dependencies to inject, this is acceptable
  app.useGlobalGuards(new AuthGuard);
  app.useGlobalFilters(new HttpExceptionFilter()) // doesn't have any dependencies, so will work 
  // app.useGlobalInterceptors(new LoggingInterceptor()); // this is outside di, so we can't inject dependencies directly so provide it at controller level
  await app.listen(3000);
}
bootstrap();
