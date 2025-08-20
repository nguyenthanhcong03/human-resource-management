import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Department } from './Department'
import { Position } from './Position'
import { Contract } from './Contract'
import { Payroll } from './Payroll'
import { Attendance } from './Attendance'
import { Leave } from './Leave'
import { Evaluation } from './Evaluation'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  employeeCode!: string

  @Column()
  fullName!: string

  @Column({ nullable: true })
  gender!: string

  @Column({ type: 'date', nullable: true })
  dob!: Date

  @Column({ nullable: true })
  phone!: string

  @Column({ nullable: true })
  email!: string

  @Column({ nullable: true })
  address!: string

  // CMND/CCCD
  @Column({ length: 20, nullable: true })
  nationalId!: string

  @Column({ type: 'date', nullable: true })
  idIssueDate!: Date

  @Column({ length: 255, nullable: true })
  idIssuePlace!: string

  @Column({ type: 'date' })
  hireDate!: Date

  @Column({
    type: 'enum',
    enum: ['active', 'probation', 'resigned', 'suspended'],
    default: 'active'
  })
  status!: 'active' | 'probation' | 'resigned' | 'suspended'

  // Thông tin thanh toán
  @Column({ length: 100, nullable: true })
  bankName!: string

  @Column({ length: 50, nullable: true })
  bankAccount!: string

  @Column({ length: 50, nullable: true })
  taxCode!: string

  // Liên hệ khẩn cấp
  @Column({ length: 255, nullable: true })
  emergencyContactName!: string

  @Column({ length: 20, nullable: true })
  emergencyContactPhone!: string

  @Column({ length: 50, nullable: true })
  emergencyContactRelation!: string

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @ManyToOne(() => Department, (department) => department.employees)
  department!: Department

  @ManyToOne(() => Position, (position) => position.employees)
  position!: Position

  @OneToMany(() => Contract, (contract) => contract.employee)
  contracts!: Contract[]

  @OneToMany(() => Payroll, (payroll) => payroll.employee)
  payrolls!: Payroll[]

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances!: Attendance[]

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves!: Leave[]

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations!: Evaluation[]
}
