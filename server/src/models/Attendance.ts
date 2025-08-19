import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Employee } from "./Employee"

@Entity("attendances")
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Employee, (employee) => employee.attendances)
  employee: Employee

  @Column({ type: "date" })
  date: Date

  @Column({ type: "time", nullable: true })
  check_in: string

  @Column({ type: "time", nullable: true })
  check_out: string

  @Column({ default: "present" })
  status: string
}
