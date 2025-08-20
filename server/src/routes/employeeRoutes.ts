import { Router } from 'express'
// import { validate } from '../middleware/validation.middleware'
import employeeController from '@/controllers/employeeController'

const router = Router()

// POST /auth/register - Register a new account
router.post('/create', employeeController.createEmployee)

export default router
