import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Employee } from './Employee'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn()
  employee!: Employee

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column({ default: 'employee' })
  role!: 'admin' | 'manager' | 'employee'

  @Column({ type: 'timestamp', nullable: true })
  lastLogin!: Date
}
