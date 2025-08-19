import { Router } from 'express'
import authRoutes from './authRoutes'

const router = Router()

// API Routes
router.use('/auth', authRoutes)

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString()
  })
})

export default router
