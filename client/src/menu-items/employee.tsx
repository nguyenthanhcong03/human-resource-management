// assets
import { DashboardOutlined } from '@ant-design/icons'

// icons
const icons = {
  DashboardOutlined
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const employee = {
  id: 'group-dashboard',
  title: 'Nhân viên',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Danh sách nhân viên',
      type: 'item',
      url: '/employee',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
}

export default employee
