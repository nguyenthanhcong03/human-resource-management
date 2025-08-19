import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './Employee'

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Employee, (employee) => employee.contracts)
  employee!: Employee

  @Column()
  contractType!: string

  @Column({ type: 'date' })
  startDate!: Date

  @Column({ type: 'date', nullable: true })
  endDate!: Date

  @Column('decimal', { precision: 10, scale: 2 })
  salary!: number

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  insurance!: number
}
