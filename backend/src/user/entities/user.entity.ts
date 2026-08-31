import { Base } from "src/base/entities/Base.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Gender, Role } from "../enums/user.enum";
import { Exclude } from "class-transformer";
import { Friend } from "src/friend/entities/friend.entity";
import { Message } from "src/message/entities/message.entity";
import { Matching } from "src/matching/entities/matching.entity";
import { History } from "src/history/entities/history.entity";
import { Notification } from "src/notification/entities/notification.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Token } from "src/token/entities/token.entity";

@Entity()
export class User extends Base {
    @Column({ unique: true })
    nickname!: string;

    @Column()
    hiddenNickname!: string;

    @Column({ type: 'varchar', nullable: true })
    profileImgUrl!: string | null;

    @Column()
    hiddenProfileEmoji!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ type: 'date' })
    birthday!: string;

    @Column({ type: 'varchar', nullable: true })
    description!: string | null;

    @Column({ type: 'enum', enum: Role })
    role!: Role;

    @Column({ type: 'enum', enum: Gender })
    gender!: Gender;

    @Exclude({ toPlainOnly: true })
    @Column()
    provider!: string;
    
    @Exclude({ toPlainOnly: true })
    @Column()
    providerId!: string;

    @OneToMany(() => Friend, (friend) => friend.userId)
    friendUsers!: Friend[];

    @OneToMany(() => Friend, (friend) => friend.targetUserId)
    targetFriendUsers!: Friend[];

    @OneToMany(() => Message, (message) => message.userId)
    sendUsers!: Message[];
    
    @OneToMany(() => Message, (message) => message.targetUserId)
    targetMessageUsers!: Message[];
    
    @OneToMany(() => Matching, (matching) => matching.userId)
    matchingUsers!: Matching[];
    
    @OneToMany(() => Matching, (matching) => matching.targetUserId)
    targetMatchingUsers!: Matching[];

    @OneToMany(() => History, (history) => history.userId)
    historyUsers!: History[];
    
    @OneToMany(() => History, (history) => history.targetUserId)
    targetHistoryUsers!: History[];

    @OneToMany(() => Notification, (notification) => notification.userId)
    notificationUsers!: Notification[];
    
    @OneToMany(() => Notification, (notification) => notification.targetUserId)
    targetNotificationUsers!: Notification[];

    @OneToMany(() => Payment, (payment) => payment.userId)
    paymentUsers!: Payment[];

    @OneToOne(() => Token, (token) => token.userId)
    tokenUser!: Token;
}