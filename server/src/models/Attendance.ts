import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './Employee'

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Employee, (employee) => employee.attendances)
  employee!: Employee

  @Column({ type: 'date' })
  date!: Date

  @Column({ type: 'time', nullable: true })
  checkIn!: string

  @Column({ type: 'time', nullable: true })
  checkOut!: string

  @Column({ default: 'present' })
  status!: string
}
