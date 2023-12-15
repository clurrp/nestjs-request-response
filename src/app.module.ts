import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST, // need to add scope b/c we are injecting a request scope dependency so we also want the interceptor to be request scoped
    useClass: AuthGuard,
  },
  // {
  //   provide: APP_FILTER,
  //   useClass: HttpExceptionFilter, // access to dependencies injected into that filter
  // }
],
})
export class AppModule implements NestModule {
  // Configure function
  configure(consumer: MiddlewareConsumer) {
      // theres a fluid interface where we can apply any number of middleware to attach
      // forRoutes is flexible, pass in object to specify path & method to apply middleware for
      // consumer.apply(AuthenticationMiddleware).forRoutes({ path: "/path", method: RequestMethod.GET}) // would mean middleware applied to these routes only 
      consumer.apply(AuthenticationMiddleware).forRoutes('*') // wildcard to apply routes globally
  }
}
