import AnimateButton from '@/components/@extended/AnimateButton'
// import IconButton from '@/components/@extended/IconButton'
import { loginSchema, type LoginFormValues } from '@/schemas/authSchema'
import { login } from '@/store/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { showSnackbar } from '@/store/snackbarSlice'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const iconButtonRef = useRef(null)
  const { isLoading } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login data:', data)
    try {
      await dispatch(login(data)).unwrap()
      dispatch(
        showSnackbar({
          message: 'Đăng nhập thành công',
          severity: 'success'
        })
      )
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1000)
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || 'Đăng nhập thất bại',
          severity: 'error'
        })
      )
    }
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor='email-login'>Địa chỉ Email</InputLabel>
              <OutlinedInput
                id='email-login'
                type='email'
                {...register('username')}
                placeholder='Nhập địa chỉ email'
                fullWidth
                error={Boolean(errors.username)}
              />
            </Stack>
            {errors.username && (
              <FormHelperText error id='standard-weight-helper-text-email-login'>
                {errors.username.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor='password-login'>Mật khẩu</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(errors.password)}
                id='password-login'
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      color='secondary'
                      // disableFocusRipple
                      disableRipple
                      ref={iconButtonRef}
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder='Nhập mật khẩu'
              />
            </Stack>
            {errors.password && (
              <FormHelperText error id='standard-weight-helper-text-password-login'>
                {errors.password.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={12} sx={{ mt: -1 }}>
            <Stack direction='row' sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name='checked'
                    color='primary'
                    size='small'
                  />
                }
                label={<Typography variant='h6'>Ghi nhớ đăng nhập</Typography>}
              />
              <Link variant='h6' component={RouterLink} to='#' color='text.primary'>
                Quên mật khẩu?
              </Link>
            </Stack>
          </Grid>
          <Grid size={12}>
            <AnimateButton>
              <Button fullWidth loading={isLoading} size='large' variant='contained' color='primary' type='submit'>
                Đăng nhập
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
