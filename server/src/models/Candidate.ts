import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Recruitment } from './Recruitment'

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  fullName!: string

  @Column()
  email!: string

  @Column()
  phone!: string

  @Column({ nullable: true })
  cvUrl!: string

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.candidates)
  appliedJob!: Recruitment

  @Column({ default: 'pending' })
  status!: string
}
