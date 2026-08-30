import { Column, Entity } from "typeorm";
import { Exclude } from 'class-transformer';
import { Base } from "src/base/entities/Base.entity";
import { Gender, Role } from "../enums/user.enum";

@Entity()
export class User extends Base{
    @Column({ type: 'enum', enum: Role })
    role!: Role;

    @Column()
    email!: string;

    @Column()
    nickname!: string;

    @Column()
    hiddenNickname!: string;

    @Column()
    description!: string;

    @Column({ type: 'enum', enum: Gender})
    gender!: Gender;

    @Column({ type: 'varchar', nullable: true })
    profileImgUrl!: string | null;

    @Column()
    hiddenProfileEmoji!: string;

    @Column({ type: 'date' })
    birthday!: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    provider!: string;
    
    @Exclude({ toPlainOnly: true })
    @Column()
    providerId!: string;
}
