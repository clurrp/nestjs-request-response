import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestService } from "src/request.service";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      // get access to execution context just like the guard
      // next returns us an observable which we can use to pipe our nestjs operators on
      const request = context.switchToHttp().getRequest();
      const userAgent = request.get('user-agent') || '';
      const { ip, method, path: url } = request;

      // context.getClass().name = controller request is made to
      this.logger.log(`
        ${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name} invoked...
      `);

      // since middleware runs before interceptors, userId will be set - whose calling our request

      this.logger.debug('userId:', this.requestService.getUserId())

      // how long request took
      const now = Date.now();
      return next.handle().pipe(
        // tap gets handled after route has been exectuted
        tap((res) => {
          const response = context.switchToHttp().getResponse();

          const { statusCode } = response;
          const contentLength = response.get('content-length');

          this.logger.log(`
          ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${Date.now()}ms
          `)

          this.logger.debug('Response:', res);
        })
      )
  }
}