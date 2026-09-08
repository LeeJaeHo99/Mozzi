import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
    // 메시지 방 목록 조회
    async getMessageRooms(){}

    // 메시지 방 내 메시지 조회
    async getMessages(){}

    // 읽지 않은 메시지 갯수 조회
    async getUnreadMessageNum(){}

    // 메시지 보내기
    async postMessage(){}

    // 메시지 읽기
    async readMessages(){}

    // 메시지 삭제
    async deleteMessages(){}
}
