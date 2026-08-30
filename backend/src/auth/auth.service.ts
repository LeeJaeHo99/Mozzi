import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ){}

    async googleLogin(idToken: string){
        const client = new OAuth2Client(process.env.GOOGLE_IOS_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_IOS_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        let user = await this.userRepository.findOne({
            where: { provider: 'google', providerId: payload?.sub },
        });

        if(!user) {
            return {
                isNew: true,
                profile: {
                    providerId: payload?.sub,
                    email: payload?.email,
                    nickname: payload?.name,
                    profileImgUrl: payload?.picture,
                }
            }
        }

        const accessToken = this.jwtService.sign({
            sub: user.id,
            role: user.role,
        });

        return { isNew: false, accessToken, user };
    }
}
