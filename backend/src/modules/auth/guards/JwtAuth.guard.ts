import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload, RequestUser } from '../types/jwt-payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException('인증 토큰이 필요합니다.');
        }

        try {
            const payload = this.jwtService.verify<JwtPayload>(token);
            (request as Request & { user: RequestUser }).user = {
                id: payload.sub,
                role: payload.role,
            };
            return true;
        } catch {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }

    extractToken(request: Request): string | undefined {
        const authorization = request.headers.authorization;

        if (!authorization?.startsWith('Bearer ')) {
            return undefined;
        }

        return authorization.slice('Bearer '.length);
    }
}
