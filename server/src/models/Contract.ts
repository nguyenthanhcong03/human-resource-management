import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './Employee'

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Employee, (employee) => employee.contracts)
  employee!: Employee

  // Loại hợp đồng
  @Column({
    type: 'enum',
    enum: ['intern', 'probation', 'official', 'part-time', 'freelance'],
    nullable: true
  })
  contractType!: 'intern' | 'probation' | 'official' | 'part-time' | 'freelance'

  @Column({ type: 'date' })
  startDate!: Date

  @Column({ type: 'date', nullable: true })
  endDate!: Date

  @Column('decimal', { precision: 10, scale: 2 })
  salary!: number

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  insuranceNumber!: number
}
