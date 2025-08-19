import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Employee } from './models//Employee'
import { Department } from './models//Department'
import { Position } from './models//Position'
import { Contract } from './models//Contract'
import { Payroll } from './models//Payroll'
import { Attendance } from './models//Attendance'
import { Leave } from './models//Leave'
import { Recruitment } from './models//Recruitment'
import { Candidate } from './models//Candidate'
import { Evaluation } from './models//Evaluation'
import { User } from './models//User'

export const AppDataSource = new DataSource({
  type: 'mysql', // hoặc "postgres"
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hrm_db',
  synchronize: true, // chỉ dùng dev, prod thì nên migration
  logging: false,
  entities: [
    Employee,
    Department,
    Position,
    Contract,
    Payroll,
    Attendance,
    Leave,
    Recruitment,
    Candidate,
    Evaluation,
    User
  ],
  migrations: ['src/migrations/*.ts'],
  subscribers: []
})
