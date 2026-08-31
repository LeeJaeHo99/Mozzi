import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PayStatus } from "../enums/payment.enum";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // TODO 추후 enum으로 변경
    @Column()
    productId!: string;

    @Column({ unique: true })
    transactionId!: string

    @CreateDateColumn()
    purchasedAt!: Date;

    @DeleteDateColumn({ nullable: true })
    refundAt!: Date | null;

    @ManyToOne(() => User, (user) => user.paymentUsers)
    userId!: User;

    @Column()
    price!: number;

    @Column()
    amount!: number;

    @Column({ type: 'enum', enum: PayStatus })
    payStatus!: PayStatus
}