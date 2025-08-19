import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Department } from "./Department"
import { Position } from "./Position"
import { Contract } from "./Contract"
import { Payroll } from "./Payroll"
import { Attendance } from "./Attendance"
import { Leave } from "./Leave"
import { Evaluation } from "./Evaluation"

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  employee_code: string

  @Column()
  full_name: string

  @Column({ nullable: true })
  gender: string

  @Column({ type: "date", nullable: true })
  dob: Date

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  address: string

  @Column({ type: "date" })
  hire_date: Date

  @Column({ default: "active" })
  status: string

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department

  @ManyToOne(() => Position, (position) => position.employees)
  position: Position

  @OneToMany(() => Contract, (contract) => contract.employee)
  contracts: Contract[]

  @OneToMany(() => Payroll, (payroll) => payroll.employee)
  payrolls: Payroll[]

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances: Attendance[]

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[]

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations: Evaluation[]
}
