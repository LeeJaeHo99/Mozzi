import { Base } from "src/base/entities/Base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { ReportType } from "../enums/reports.enum";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Report extends Base {
    @Column({ type: 'enum', enum: ReportType })
    reportType!: ReportType;

    @ManyToOne(() => User, (user) => user.reporter)
    reporterId!: User;
    
    @ManyToOne(() => User, (user) => user.reportedUser)
    reportedUserId!: User;

    @Column()
    contentsId!: string;

    @Column()
    comment!: string;
}