import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Candidate } from './Candidate'
import { Department } from './Department'

@Entity('recruitments')
export class Recruitment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  jobTitle!: string

  @ManyToOne(() => Department, (department) => department.id)
  department!: Department

  @Column('text')
  description!: string

  @Column({ default: 'open' })
  status!: string

  @OneToMany(() => Candidate, (candidate) => candidate.appliedJob)
  candidates!: Candidate[]
}
