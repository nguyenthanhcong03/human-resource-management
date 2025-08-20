import { AppDataSource } from '@/data-source'
import { Employee } from '@/models/Employee'
import bcrypt from 'bcryptjs'
import ApiError from '../utils/ApiError'

const employeeRepo = AppDataSource.getRepository(Employee)

const createEmployee = async (employeeData: any) => {
  console.log('employeeData:', employeeData)
  const {
    employeeCode,
    fullName,
    gender,
    dob,
    phone,
    email,
    address,
    nationalId,
    idIssueDate,
    idIssuePlace,
    hireDate,
    status,
    departmentId,
    positionId,
    managerId,
    contractType,
    bankName,
    bankAccount,
    taxCode,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation
  } = employeeData

  // Kiểm tra xem nhân viên đã tồn tại chưa
  const existingEmployee = await employeeRepo.findOne({ where: { employeeCode } })
  if (existingEmployee) {
    throw new ApiError(409, 'Nhân viên với mã này đã tồn tại')
  }

  // Create employee
  const employee = employeeRepo.create({})
  await employeeRepo.save(employee)
  console.log('employee:', employee)
  return employee
}

export default {
  createEmployee
}
