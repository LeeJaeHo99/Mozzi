import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/auth/types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
    (data: keyof RequestUser | undefined, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user as RequestUser;

        return data ? user?.[data] : user;
    },
);