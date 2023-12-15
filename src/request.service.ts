import { Injectable, Scope } from "@nestjs/common";

// Injection scopes
// Scope this service to the request
// And each request that comes in to the system, will get a new request service
// Makes our application thread safe or request safe
@Injectable({ scope: Scope.REQUEST})
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId
  }

  getUserId() {
    return this.userId
  }
}