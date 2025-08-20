import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { Employee } from './models//Employee'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { errorConverter, errorHandler, notFound } from '@/middlewares/errorMiddleware'
import authController from './controllers/authController'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet()) // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(morgan('combined')) // Logging
app.use(cookieParser()) // Parse cookies
// app.use(express.json({ limit: '10mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/v1', routes)

// Error handling middleware
app.use(notFound)
app.use(errorConverter)
app.use(errorHandler)

// Kết nối database
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Data Source has been initialized!')

    // Sample route
    app.get('/', (req: Request, res: Response) => {
      res.send('🚀 HRM API running...')
    })

    // Sample route
    app.post('/auth/register', authController.registerAccount)

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.error('❌ Error during Data Source initialization', err)
  })
