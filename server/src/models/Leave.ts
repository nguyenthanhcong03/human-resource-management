import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './Employee'

@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Employee, (employee) => employee.leaves)
  employee!: Employee

  @Column()
  leaveType!: string

  @Column({ type: 'date' })
  startDate!: Date

  @Column({ type: 'date' })
  endDate!: Date

  @Column({ nullable: true })
  reason!: string

  @Column({ default: 'pending' })
  status!: string
}
