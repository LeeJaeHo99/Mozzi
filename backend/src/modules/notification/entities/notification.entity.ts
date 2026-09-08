import { Base } from "src/modules/base/entities/Base.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { NotificationType } from "../enums/notification.enum";

@Entity()
export class Notification extends Base {
    @ManyToOne(() => User, (user) => user.notificationUsers)
    userId!: User;

    @ManyToOne(() => User, (user) => user.targetNotificationUsers)
    targetUserId!: User;

    @Column({ type: 'enum', enum: NotificationType })
    type!: NotificationType;

    @Column({ default: false })
    isRead!: boolean;

    @Column()
    contentsLink!: string;
}