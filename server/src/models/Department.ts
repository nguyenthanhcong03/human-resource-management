import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Employee } from './Employee'

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  departmentName!: string

  @OneToMany(() => Employee, (employee) => employee.department)
  employees!: Employee[]
}
