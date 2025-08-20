import axiosInstance from '../config/axios'

const API_ENDPOINT = '/employee'

export const createEmployeeAPI = async (employeeData: any) => {
  const response = await axiosInstance.post(`${API_ENDPOINT}/register`, employeeData)
  console.log('response', response)
  return response
}
