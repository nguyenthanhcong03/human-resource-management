import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Employee } from './Employee'

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  positionName!: string

  @Column('decimal', { precision: 10, scale: 2 })
  baseSalary!: number

  @OneToMany(() => Employee, (employee) => employee.position)
  employees!: Employee[]
}
