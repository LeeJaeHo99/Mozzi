import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/modules/base/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/JwtAuth.guard';
import { ApiGetUserProfile, ApiSignUp, ApiUpdateUserProfile } from './swagger/user.swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCommonBodyNone } from '../base/swagger/common.swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiSignUp('회원가입')
    @Post('signup')
    signUp(
        @Body() dto: CreateUserDto,
    ){
        return this.userService.singUp(dto);
    }

    @ApiGetUserProfile('내 프로필 조회')
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyProfile(
        @CurrentUser('id') userId: string,
    ){
        return this.userService.getMyProfile(userId);
    }

    @ApiGetUserProfile('유저 프로필 조회')
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserProfile(
        @Param('id') userId: string,
    ){
        return this.userService.getUserProfile(userId);
    }

    @ApiUpdateUserProfile('유저 프로필 수정')
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateProfile(
        @CurrentUser('id') userId: string,
        @Body() dto: UpdateUserDto,
    ){
        return this.userService.updateProfile(userId, dto);
    }

    @ApiCommonBodyNone('회원 탈퇴')
    @UseGuards(JwtAuthGuard)
    @Delete()
    quitUser(
        @CurrentUser('id') userId: string,
    ){
        return this.userService.quitUser(userId);
    }
}
