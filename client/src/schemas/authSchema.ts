import z from 'zod'

// Schema for login form
export const loginSchema = z.object({
  username: z.string().min(1, 'Tên đăng nhập không được để trống').min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: z.string().min(1, 'Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

// // Schema for register form
// const registerSchema = z.object({
//   name: z.string().min(1, 'Tên không được để trống'),
//   email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
//   password: z.string().min(1, 'Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
// })

export type LoginFormValues = z.infer<typeof loginSchema>
// type RegisterFormValues = z.infer<typeof registerSchema>
