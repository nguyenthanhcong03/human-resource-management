import { Router } from 'express'
import authRoutes from './authRoutes'
import employeeRoutes from './employeeRoutes'

const router = Router()

// API Routes
router.use('/auth', authRoutes)
router.use('/employee', employeeRoutes)

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString()
  })
})

export default router
