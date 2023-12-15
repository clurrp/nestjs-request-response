import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RequestService } from "src/request.service";

// All classes can be made injectable
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  // Create logger
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(AuthenticationMiddleware.name);
    // Authenticate the request w/ JWT
    const userId = '123';
    // Make this readily available to the rest of application, 
    // so we don't have to pull it off request object each time we need it
    // Create request service as a container for all shareable request data
    this.requestService.setUserId(userId);

    next(); // Allows request to continue
  }
}