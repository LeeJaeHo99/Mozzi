import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
    ){}

    async getMyAllFriends(userId: string){
        const friends = await this.friendRepository.find({
            where: { userId: { id: userId } },
        });

        return friends;
    }
}