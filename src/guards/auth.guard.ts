import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  // Three approaches to implement a guard in the system
  // In main.ts - attach it global to our app
  // At controller level for individual route
  // Apply global but have dependencies to inject, we can use it in app.modules.ts providers


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(AuthGuard.name);
    // can get access to request object
    const request = context.switchToHttp().getRequest();
    // do authentication with request object
    return true; // grants or forbids access to our routes
  }
}