import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { SearchModule } from './modules/search/search.module';
import { FriendModule } from './modules/friend/friend.module';
import { MessageModule } from './modules/message/message.module';
import { NotificationModule } from './modules/notification/notification.module';
import { HistoryModule } from './modules/history/history.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Auth } from './modules/auth/entities/auth.entity';
import { User } from './modules/user/entities/user.entity';
import { Friend } from './modules/friend/entities/friend.entity';
import { Message } from './modules/message/entities/message.entity';
import { Payment } from './modules/payment/entities/payment.entity';
import { History } from './modules/history/entities/history.entity';
import { Notification } from './modules/notification/entities/notification.entity';
import { TokenModule } from './modules/token/token.module';
import { Token } from './modules/token/entities/token.entity';
import { AdminModule } from './modules/admin/admin.module';
import { ReportModule } from './modules/report/report.module';
import { Report } from './modules/report/entities/report.entity';
import { MatchingModule } from './modules/matching/matching.module';
import { Matching } from './modules/matching/entities/matching.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                Auth,
                User,
                Friend,
                Message,
                Notification,
                Payment,
                History,
                Token,
                Report,
                Matching,
            ],
            synchronize: true,
        }),
        PaymentModule,
        SearchModule,
        FriendModule,
        MessageModule,
        NotificationModule,
        HistoryModule,
        UserModule,
        AuthModule,
        TokenModule,
        AdminModule,
        ReportModule,
        MatchingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}