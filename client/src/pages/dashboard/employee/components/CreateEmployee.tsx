import { employeeSchema, type EmployeeFormValues } from '@/schemas/employeeSchema'
import { createEmployee } from '@/store/employeeSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { showSnackbar } from '@/store/snackbarSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `employee-tab-${index}`,
    'aria-controls': `employee-tabpanel-${index}`
  }
}

const CreateEmployee = () => {
  const [tabValue, setTabValue] = useState(0)
  const dispatch = useAppDispatch()
  const { loading, error, success } = useAppSelector((state) => state.employee)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeCode: '',
      fullName: '',
      gender: 'male',
      dob: undefined,
      phone: '',
      email: '',
      address: '',
      nationalId: '',
      idIssueDate: undefined,
      idIssuePlace: '',
      hireDate: dayjs().toDate(),
      resignationDate: undefined,
      status: 'active',
      departmentId: undefined,
      positionId: undefined,
      managerId: undefined,
      contractType: undefined,
      bankName: '',
      bankAccount: '',
      taxCode: '',
      insuranceNumber: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: ''
    }
  })

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      console.log(data)
      await dispatch(createEmployee(data)).unwrap()
      dispatch(showSnackbar({ message: 'Thêm nhân viên thành công', severity: 'success' }))
    } catch (error) {
      console.error(error)
      dispatch(showSnackbar({ message: 'Thêm nhân viên thất bại', severity: 'error' }))
    }
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Thêm nhân viên mới
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title='Thông tin nhân viên' />
          <Divider />

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label='employee form tabs'>
              <Tab label='Thông tin cá nhân' {...a11yProps(0)} />
              <Tab label='Thông tin công việc' {...a11yProps(1)} />
              <Tab label='Thông tin thanh toán' {...a11yProps(2)} />
              <Tab label='Liên hệ khẩn cấp' {...a11yProps(3)} />
            </Tabs>
          </Box>

          <CardContent>
            {/* Thông tin cá nhân */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='employeeCode'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Mã nhân viên *'
                        error={!!errors.employeeCode}
                        helperText={errors.employeeCode?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='fullName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Họ và tên *'
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel id='gender-label'>Giới tính *</InputLabel>
                        <Select {...field} labelId='gender-label' label='Giới tính *'>
                          <MenuItem value='male'>Nam</MenuItem>
                          <MenuItem value='female'>Nữ</MenuItem>
                          <MenuItem value='other'>Khác</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='dob'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Ngày sinh *'
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(dayjs(date).toDate())
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.dob,
                              helperText: errors.dob?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Số điện thoại'
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Email'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Địa chỉ'
                        multiline
                        rows={3}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='nationalId'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='CMND/CCCD'
                        error={!!errors.nationalId}
                        helperText={errors.nationalId?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='idIssueDate'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Ngày cấp'
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(dayjs(date).toDate())
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.idIssueDate,
                              helperText: errors.idIssueDate?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='idIssuePlace'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Nơi cấp'
                        error={!!errors.idIssuePlace}
                        helperText={errors.idIssuePlace?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Thông tin công việc */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='hireDate'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Ngày vào làm *'
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(dayjs(date).toDate())
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.hireDate,
                              helperText: errors.hireDate?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.status}>
                        <InputLabel id='status-label'>Trạng thái</InputLabel>
                        <Select {...field} labelId='status-label' label='Trạng thái'>
                          <MenuItem value='active'>Đang làm việc</MenuItem>
                          <MenuItem value='probation'>Thử việc</MenuItem>
                          <MenuItem value='resigned'>Đã nghỉ việc</MenuItem>
                          <MenuItem value='suspended'>Tạm ngưng</MenuItem>
                        </Select>
                        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='departmentId'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.departmentId}>
                        <InputLabel id='department-label'>Phòng ban</InputLabel>
                        <Select {...field} labelId='department-label' label='Phòng ban'>
                          {/* Placeholder for Department options - will come from API */}
                          <MenuItem value={1}>Phòng Nhân sự</MenuItem>
                          <MenuItem value={2}>Phòng Kế toán</MenuItem>
                          <MenuItem value={3}>Phòng Kinh doanh</MenuItem>
                        </Select>
                        {errors.departmentId && <FormHelperText>{errors.departmentId.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='positionId'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.positionId}>
                        <InputLabel id='position-label'>Chức vụ</InputLabel>
                        <Select {...field} labelId='position-label' label='Chức vụ'>
                          {/* Placeholder for Position options - will come from API */}
                          <MenuItem value={1}>Nhân viên</MenuItem>
                          <MenuItem value={2}>Trưởng nhóm</MenuItem>
                          <MenuItem value={3}>Trưởng phòng</MenuItem>
                        </Select>
                        {errors.positionId && <FormHelperText>{errors.positionId.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='managerId'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.managerId}>
                        <InputLabel id='manager-label'>Quản lý trực tiếp</InputLabel>
                        <Select {...field} labelId='manager-label' label='Quản lý trực tiếp'>
                          {/* Placeholder for Manager options - will come from API */}
                          <MenuItem value={1}>Nguyễn Văn A</MenuItem>
                          <MenuItem value={2}>Trần Thị B</MenuItem>
                          <MenuItem value={3}>Lê Văn C</MenuItem>
                        </Select>
                        {errors.managerId && <FormHelperText>{errors.managerId.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='contractType'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.contractType}>
                        <InputLabel id='contract-type-label'>Loại hợp đồng</InputLabel>
                        <Select {...field} labelId='contract-type-label' label='Loại hợp đồng'>
                          <MenuItem value='intern'>Thực tập</MenuItem>
                          <MenuItem value='probation'>Thử việc</MenuItem>
                          <MenuItem value='official'>Chính thức</MenuItem>
                          <MenuItem value='part-time'>Bán thời gian</MenuItem>
                          <MenuItem value='freelance'>Cộng tác viên</MenuItem>
                        </Select>
                        {errors.contractType && <FormHelperText>{errors.contractType.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='resignationDate'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Ngày nghỉ việc'
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(dayjs(date).toDate())
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.resignationDate,
                              helperText: errors.resignationDate?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Thông tin thanh toán */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='bankName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Tên ngân hàng'
                        error={!!errors.bankName}
                        helperText={errors.bankName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='bankAccount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Số tài khoản'
                        error={!!errors.bankAccount}
                        helperText={errors.bankAccount?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='taxCode'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Mã số thuế'
                        error={!!errors.taxCode}
                        helperText={errors.taxCode?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='insuranceNumber'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Số bảo hiểm xã hội'
                        error={!!errors.insuranceNumber}
                        helperText={errors.insuranceNumber?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Liên hệ khẩn cấp */}
            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='emergencyContactName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Tên người liên hệ'
                        error={!!errors.emergencyContactName}
                        helperText={errors.emergencyContactName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='emergencyContactPhone'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Số điện thoại liên hệ'
                        error={!!errors.emergencyContactPhone}
                        helperText={errors.emergencyContactPhone?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='emergencyContactRelation'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Mối quan hệ'
                        error={!!errors.emergencyContactRelation}
                        helperText={errors.emergencyContactRelation?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>

          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined'>Huỷ</Button>
              <Button type='submit' variant='contained' loading={loading} disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : 'Thêm nhân viên'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </form>
    </Box>
  )
}

export default CreateEmployee
