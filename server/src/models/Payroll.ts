import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './Employee'

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Employee, (employee) => employee.payrolls)
  employee!: Employee

  @Column()
  month!: number

  @Column()
  year!: number

  @Column('decimal', { precision: 10, scale: 2 })
  baseSalary!: number

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  bonus!: number

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  overtime!: number

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  deduction!: number

  @Column('decimal', { precision: 10, scale: 2 })
  netSalary!: number
}
