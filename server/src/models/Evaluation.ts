import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Employee } from "./Employee"

@Entity("evaluations")
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Employee, (employee) => employee.evaluations)
  employee: Employee

  @Column()
  review_period: string

  @Column("decimal", { precision: 5, scale: 2 })
  kpi_score: number

  @Column("text", { nullable: true })
  comments: string

  @ManyToOne(() => Employee, { nullable: true })
  reviewer: Employee
}
