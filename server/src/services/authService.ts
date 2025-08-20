import bcrypt from 'bcryptjs'
import { User } from '@/models/User'
import ApiError from '../utils/ApiError'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppDataSource } from '@/data-source'

const userRepo = AppDataSource.getRepository(User)

const register = async (userData: any) => {
  // const { username, password } = userData
  // console.log('userData:', userData)
  const username = 'admin'
  const password = '123456'

  // Kiểm tra xem người dùng đã tồn tại chưa
  const existingUser = await userRepo.findOne({ where: { username } })
  if (existingUser) {
    throw new ApiError(409, 'Tên đăng nhập đã được sử dụng')
  }

  // Hash password
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // Create user
  const user = userRepo.create({
    username,
    password: hashedPassword
  })
  await userRepo.save(user)
  console.log('user:', user)

  // Loại bỏ password khỏi response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

const login = async (loginData: any) => {
  const { username, password } = loginData

  // Tìm người dùng
  const user = await userRepo.findOne({ where: { username } })
  if (!user) {
    throw new ApiError(401, 'Thông tin đăng nhập không hợp lệ')
  }

  const currentPassword = user.password
  // const currentPassword = user.getDataValue('password')
  console.log('đến đây:', currentPassword)

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, currentPassword)
  if (!isMatch) {
    throw new ApiError(401, 'Thông tin đăng nhập không hợp lệ')
  }

  // Tạo user payload cho JWT
  const userPayload = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  // Tạo tokens
  const accessToken = generateAccessToken(userPayload)
  const refreshToken = generateRefreshToken(userPayload)

  return {
    user: userPayload,
    accessToken,
    refreshToken
  }
}

const changePassword = async (id: number, currentPassword: string, newPassword: string) => {
  const user = await userRepo.findOneBy({ id })
  if (!user) {
    throw new Error('Người dùng không tồn tại')
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
  if (!isCurrentPasswordValid) {
    throw new Error('Mật khẩu hiện tại không đúng')
  }

  // Hash new password
  const saltRounds = 12
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

  await userRepo.update({ id }, { password: hashedNewPassword })
  return { message: 'Password changed successfully' }
}

const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required')
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string)
    const user = await userRepo.findOne({
      where: { id: (decoded as any).id },
      select: {
        id: true,
        username: true,
        role: true
      }
    })
    if (!user) {
      throw new ApiError(401, 'User not found')
    }

    const userPayload = {
      id: user.id,
      username: user.username,
      role: user.role
    }

    // Create new tokens
    const newAccessToken = generateAccessToken(userPayload)
    return {
      accessToken: newAccessToken,
      user: userPayload
    }
  } catch (error) {
    console.log('Error refreshing token:', error)
    throw new ApiError(401, 'Invalid refresh token')
  }
}

export default {
  register,
  login,
  changePassword,
  refreshToken
}
