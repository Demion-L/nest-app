import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const isAuth = request.headers.authorization === 'secret';
    if (!isAuth) {
      throw new UnauthorizedException();
    }
    return isAuth;
  }
}
