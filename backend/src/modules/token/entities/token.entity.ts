import { Base } from "src/modules/base/entities/Base.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, Unique } from "typeorm";

@Unique(['userId'])
@Entity()
export class Token extends Base {
    @OneToOne(() => User, (user) => user.tokenUser)
    @JoinColumn({ name: 'userId' })
    userId!: User;

    @Column({ default: 0 })
    tokenCount!: number;

    @Column('text', { array: true })
    tokenHistory!: string[];
}