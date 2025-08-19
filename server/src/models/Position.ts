import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Employee } from "./Employee"

@Entity("positions")
export class Position {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  position_name: string

  @Column("decimal", { precision: 10, scale: 2 })
  base_salary: number

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[]
}
