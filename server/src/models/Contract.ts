import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Employee } from "./Employee"

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Employee, (employee) => employee.contracts)
  employee: Employee

  @Column()
  contract_type: string

  @Column({ type: "date" })
  start_date: Date

  @Column({ type: "date", nullable: true })
  end_date: Date

  @Column("decimal", { precision: 10, scale: 2 })
  salary: number

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  insurance: number
}
