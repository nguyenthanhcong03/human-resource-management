// components/GlobalSnackbar.tsx
import { useAppSelector } from '@/store/hook'
import { closeSnackbar } from '@/store/snackbarSlice'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'

export default function GlobalSnackbar() {
  const dispatch = useDispatch()
  const { open, message, severity } = useAppSelector((state) => state.snackbar)

  const handleClose = () => {
    dispatch(closeSnackbar())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', fontSize: '0.8rem' }} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}
