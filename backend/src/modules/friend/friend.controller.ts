import { Controller, Get, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CurrentUser } from 'src/modules/base/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/JwtAuth.guard';

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
