import { Role } from 'src/modules/user/enums/user.enum';

export type JwtPayload = {
    sub: string;
    role: Role;
};

export type RequestUser = {
    id: string;
    role: Role;
};
