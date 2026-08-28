import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { SearchModule } from './search/search.module';
import { FriendModule } from './friend/friend.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { HistoryModule } from './history/history.module';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { User } from './user/entities/user.entity';
import { Setting } from './setting/entities/setting.entity';
import { Friend } from './friend/entities/friend.entity';
import { Message } from './message/entities/message.entity';
import { Payment } from './payment/entities/payment.entity';
import { History } from './history/entities/history.entity';
import { Search } from './search/entities/search.entity';
import { Notification } from './notification/entities/notification.entity';
import { TokenModule } from './token/token.module';
import { Token } from './token/entities/token.entity';
import { AdminModule } from './admin/admin.module';
import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';

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
                Setting,
                Friend,
                Message,
                Notification,
                Payment,
                History,
                Search,
                Token,
                Report,
            ],
            synchronize: true,
        }),
        PaymentModule,
        SearchModule,
        FriendModule,
        MessageModule,
        NotificationModule,
        HistoryModule,
        SettingModule,
        UserModule,
        AuthModule,
        TokenModule,
        AdminModule,
        ReportModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}