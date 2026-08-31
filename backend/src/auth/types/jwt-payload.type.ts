import { Role } from 'src/user/enums/user.enum';

export type JwtPayload = {
    sub: string;
    role: Role;
};

export type RequestUser = {
    id: string;
    role: Role;
};
