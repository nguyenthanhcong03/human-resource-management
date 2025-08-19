import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Employee } from "./Employee"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn()
  employee: Employee

  @Column({ unique: true })
  username: string

  @Column()
  password_hash: string

  @Column({ default: "employee" })
  role: string

  @Column({ type: "timestamp", nullable: true })
  last_login: Date
}
