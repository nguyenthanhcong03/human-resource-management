import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Recruitment } from "./Recruitment"

@Entity("candidates")
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  full_name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({ nullable: true })
  cv_url: string

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.candidates)
  applied_job: Recruitment

  @Column({ default: "pending" })
  status: string
}
