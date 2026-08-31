import { Controller, Get, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CurrentUser } from 'src/base/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuth.guard';

@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getMyAllFriends(
        @CurrentUser('id') userId: string,
    ){
        return this.friendService.getMyAllFriends(userId);
    }
}
