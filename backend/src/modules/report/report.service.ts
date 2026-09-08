import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
    // 신고 목록 가져오기 (나의 신고)
    async getMyReportsToMe(){}
    
    // 신고 목록 가져오기 (내가 받은 신고)
    async getMyReportsForMe(){}

    // 신고하기
    async postReport(){}
}
