import { Base } from "src/base/entities/Base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AcceptStatus } from "../enums/friend.enum";

@Unique(['userId', 'targetUserId'])
@Entity()
export class Friend extends Base {
    @ManyToOne(() => User, (user) => user.friendUsers)
    userId!: User;

    @ManyToOne(() => User, (user) => user.targetFriendUsers)
    targetUserId!: User;

    @Column({ default: AcceptStatus.PENDING })
    isAccepted!: AcceptStatus;

    @Column({ default: false })
    isBest!: boolean;
}