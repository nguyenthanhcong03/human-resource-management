import { z } from 'zod'

export const employeeSchema = z.object({
  employeeCode: z.string().min(1, 'Mã nhân viên là bắt buộc').max(50, 'Mã nhân viên không được vượt quá 50 ký tự'),
  fullName: z.string().min(1, 'Họ tên nhân viên là bắt buộc').max(255, 'Họ tên không được vượt quá 255 ký tự'),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.date({
    error: 'Ngày sinh là bắt buộc'
  }),
  phone: z.string().optional(),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  address: z.string().optional(),
  nationalId: z.string().optional(),
  idIssueDate: z.date().optional().or(z.literal(undefined)),
  idIssuePlace: z.string().optional(),
  hireDate: z.date({
    error: 'Ngày vào làm là bắt buộc'
  }),
  resignationDate: z.date().optional().or(z.literal(undefined)),
  status: z.enum(['active', 'probation', 'resigned', 'suspended']).default('active'),
  departmentId: z.number().optional(),
  positionId: z.number().optional(),
  managerId: z.number().optional(),
  contractType: z.enum(['intern', 'probation', 'official', 'part-time', 'freelance']).optional(),
  bankName: z.string().optional(),
  bankAccount: z.string().optional(),
  taxCode: z.string().optional(),
  insuranceNumber: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelation: z.string().optional()
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
