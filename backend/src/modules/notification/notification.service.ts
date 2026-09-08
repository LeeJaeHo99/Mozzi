import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    // 알림 리스트 조회
    async getNotifications(){}

    // 읽지 않은 알림 갯수 조회
    async getUnreadNotificationNum(){}

    // 알림 보내기
    async postNotification(){}

    // 모든 알림 읽기
    async readAllNotifications(){}

    // 알림 읽기
    async readNotification(){}
}
