import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { OAuth2Client } from 'google-auth-library';
import { Role } from './enums/user.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonResponse } from '../base/utils/CommonResponse.util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    // 회원가입
    async singUp(dto: CreateUserDto){
        const payload = await this.verifyGoogleIdToken(dto.idToken);

        if (!payload?.sub || !payload.email) {
            throw new UnauthorizedException('Google 토큰 검증에 실패하였습니다.');
        }

        const exisitingUser = await this.userRepository.findOne({
            where: { provider: 'google', providerId: payload.sub },
        });

        if(exisitingUser){
            throw new ConflictException('이미 가입 완료된 유저입니다.');
        }

        const user = await this.userRepository.save({
            role: Role.USER,
            email: payload.email,
            provider: 'google',
            providerId: payload.sub,
            profileImgUrl: dto.profileImgUrl ?? payload.picture ?? null,
            nickname: dto.nickname,
            hiddenNickname: dto.hiddenNickname,
            description: dto.description,
            gender: dto.gender,
            hiddenProfileEmoji: dto.hiddenProfileEmoji,
            birthday: dto.birthday,
        });

        const accessToken = this.jwtService.sign({
            sub: user.id,
            role: user.role,
        });

        return { accessToken, user };
    }

    // 내 프로필 조회
    async getMyProfile(userId: string){
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return user;
    }

    // 유저 프로필 조회
    async getUserProfile(userId: string){
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return user;
    }

    // 유저 프로필 수정
    async updateProfile(userId: string, dto: UpdateUserDto){
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if(!user){
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        Object.assign(user, dto);

        return this.userRepository.save(user);
    }

    // 회원 탈퇴
    async quitUser(userId: string){
        await this.userRepository.softDelete({ id: userId });

        return CommonResponse('회원 탈퇴가 완료되었습니다.');
    }

    // Google IdToken 검증
    async verifyGoogleIdToken(idToken: string){
        const googleClientId = this.configService.getOrThrow<string>('GOOGLE_IOS_CLIENT_ID');

        const client = new OAuth2Client(googleClientId);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: googleClientId,
        });

        return ticket.getPayload();
    }
}