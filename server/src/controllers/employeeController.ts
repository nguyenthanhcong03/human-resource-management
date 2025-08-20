import employeeService from '@/services/employeeService'
import catchAsync from '@/utils/catchAsync'
import { Request, Response } from 'express'

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  console.log('++++vao dang ky')
  const user = await employeeService.createEmployee(req.body)
  res.status(201).json({
    success: true,
    data: user,
    message: 'Thêm nhân viên thành công'
  })
})

export default {
  createEmployee
}
