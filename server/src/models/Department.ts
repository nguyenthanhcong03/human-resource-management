import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Employee } from "./Employee"

@Entity("departments")
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  department_name: string

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[]
}
