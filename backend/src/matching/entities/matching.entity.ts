import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['userId', 'targetUserId'])
@Entity()
export class Matching {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.matchingUsers)
    userId!: User;

    @ManyToOne(() => User, (user) => user.targetMatchingUsers)
    targetUserId!: User;

    @Column()
    matchPercent!: number;

    @Column('text', { array: true })
    questions!: string[];
    
    @Column('text', { array: true })
    myAnswers!: string[];
    
    @Column('text', { array: true })
    targetAnswers!: string[];
}