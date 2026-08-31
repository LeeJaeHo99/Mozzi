import { Base } from "src/base/entities/Base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Message extends Base {
    @Column()
    text!: string;

    @Column({ type: 'timestamptz', nullable: true })
    readAt!: Date | null;

    @ManyToOne(() => User, (user) => user.sendUsers)
    userId!: User;
    
    @ManyToOne(() => User, (user) => user.targetMessageUsers)
    targetUserId!: User;
}