import React from 'react'
import EmployeeTable from './components/EmployeeTable'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EmployeePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button variant='contained' onClick={() => navigate('/employee/create')}>
        Thêm nhân viên mới
      </Button>
      <EmployeeTable />
    </div>
  )
}

export default EmployeePage
