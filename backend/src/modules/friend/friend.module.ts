import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Friend]),
        AuthModule,
    ],
    controllers: [FriendController],
    providers: [FriendService],
})
export class FriendModule {}
