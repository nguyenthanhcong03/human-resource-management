import { createEmployeeAPI } from '@/services/employeeAPI'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  loading: boolean
  error: string | null
  success: boolean
  employeeList: any[]
}
const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  employeeList: []
}

// Async thunks
export const createEmployee = createAsyncThunk('employee/createEmployee', async (employeeData, { rejectWithValue }) => {
  try {
    const employee = await createEmployeeAPI(employeeData)
    return employee
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Thêm nhân viên thất bại')
  }
})

// Auth slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  }
})

// Export actions and reducer
// export const { } = employeeSlice.actions

export default employeeSlice.reducer
