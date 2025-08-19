import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Employee } from "./Employee"

@Entity("leaves")
export class Leave {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Employee, (employee) => employee.leaves)
  employee: Employee

  @Column()
  leave_type: string

  @Column({ type: "date" })
  start_date: Date

  @Column({ type: "date" })
  end_date: Date

  @Column({ nullable: true })
  reason: string

  @Column({ default: "pending" })
  status: string
}
