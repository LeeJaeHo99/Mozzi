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

    // 친구 목록 조회
    async getMyAllFriends(userId: string){
        const friends = await this.friendRepository.find({
            where: { userId: { id: userId } },
        });

        return friends;
    }

    // 친한 친구 목록 조회
    async getMyBestFriends(){}

    // 대기 중인 친구 요청 조회
    async getPendingRequestForMe(){}

    // 보낸 친구 요청 조회
    async getPendingRequestToMe(){}

    // 친구 신청
    async postRequest(){}

    // 친구 신청 수락
    async acceptRequest(){}

    // 친구 신청 거절
    async rejectRequest(){}

    // 친한친구 설정 / 해제
    async updateBestFriend(){}

    // 친구 제거
    async deleteFriend(userId: string){}
}