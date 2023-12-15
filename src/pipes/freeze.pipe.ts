// Transform our incoming data into our system into any form we'd like to work with
// Flexibility with transforming data & validating data

import { Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name);

  // to implement pipe
  // 1. Make global pipe in main.ts
  // 2. If there's dependencys, put in app.module within provide
  // 3. Or a route basis
  transform(value: any) {
    this.logger.debug('FreezePipe running...')
    // Prevent any modification of existing properties or the addition of new properties
    Object.freeze(value);
    // Makes the object immutable
    return value;
  }
}