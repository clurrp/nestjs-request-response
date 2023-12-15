import { Body, Controller, Get, InternalServerErrorException, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseGuards(FreezePipe)
  // @UseFilters(HttpExceptionFilter)
  // can pass in any number of types in the body call
  examplePost(@Body(new FreezePipe()) body: any) {
    // body.test = 32; - won't update b/c FreezePipe
    return true;
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}


