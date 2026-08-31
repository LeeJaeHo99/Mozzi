import { Base } from "src/base/entities/Base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Unique(['userId', 'targetUserId'])
@Entity()
export class History extends Base {
    @ManyToOne(() => User, (user) => user.historyUsers)
    userId!: User;

    @ManyToOne(() => User, (user) => user.targetHistoryUsers)
    targetUserId!: User;

    @Column()
    isFriend!: boolean;

    @Column({ type: 'timestamptz' })
    lastMessageAt!: Date;
}