import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly requestService: RequestService) {}

  getHello(): string {
    const userId = this.requestService.getUserId();
    this.logger.log("getHello userId:", userId);
    return 'Hello World!';
    // To test functionality, need to register middleware
    // Two ways
    // 1. in bootstrap function in main.ts add app.use() and pass in middleware
    // 2. in app.module leveraging dependency injection
  }
}
