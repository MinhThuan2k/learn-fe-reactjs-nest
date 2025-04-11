import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { cn } from '@/core/lib/utils'
import React from 'react'
import { Mail, Lock } from 'lucide-react'
import loginBg from '@/assets/images/login-bg.jpg'
import { useMutation } from '@tanstack/react-query'
import { authService, LoginPayload } from '@/services/auth.service'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '@/core/redux/actions/authActions'
import { useReduxDispatch } from '@/core/redux/hooks'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const dispatch = useReduxDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginPayload>()

  const mutation = useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (data) => {
      dispatch(loginSuccess(data))
      toast.success('Đăng nhập thành công!', {
        autoClose: 1000,
        onClose: () => {
          navigate('/projects/jira', { replace: true })
        }
      })
    },
    onError: (error) => {
      toast.error(error.message || 'Đăng nhập thất bại!')
    }
  })
  const onSubmit = (data: LoginPayload) => {
    if (mutation.isPending) return
    mutation.mutate(data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden shadow-md rounded-xl border border-gray-200'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form
            className={cn(
              'p-6 md:p-8 bg-white transition-opacity',
              mutation.isPending || mutation.isSuccess
                ? 'pointer-events-none opacity-60'
                : ''
            )}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-3xl font-bold text-gray-900'>
                  Welcome back
                </h1>
                <p className='text-muted-foreground'>
                  Login to your Acme Inc account
                </p>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <Input
                    {...register('email', {
                      required: 'Email không được bỏ trống'
                    })}
                    id='email'
                    type='text'
                    placeholder='m@example.com'
                    className='pl-10 transition focus:ring-2 focus:ring-primary focus:outline-none'
                    required
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <div className='relative'>
                  <Lock
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <Input
                    {...register('password', {
                      required: 'Mật khẩu là bắt buộc'
                    })}
                    id='password'
                    type='password'
                    className='pl-10 transition focus:ring-2 focus:ring-primary focus:outline-none'
                    required
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
                <div className='flex items-end justify-end'>
                  <a href='#' className='text-sm text-primary hover:underline'>
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full font-semibold transition hover:shadow-lg'
                disabled={mutation.isPending || mutation.isSuccess}
              >
                {mutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>

              <Button
                variant='outline'
                className='w-full flex items-center gap-2 hover:shadow'
              >
                <img
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  alt='Google'
                  className='h-5 w-5'
                />
                Login with Google
              </Button>

              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a href='#' className='text-primary hover:underline'>
                  Sign up
                </a>
              </div>
            </div>
          </form>

          <div className='hidden md:flex items-center justify-center p-10 bg-gradient-to-tr from-[#e0eafc] to-[#cfdef3]'>
            <div className='relative rounded-3xl bg-white/40 backdrop-blur-xl shadow-xl border border-white/30 px-8 py-10 w-[320px] h-[380px] flex flex-col items-center justify-between overflow-hidden transition-transform duration-500 hover:scale-[1.03] group'>
              <div className='absolute -top-6 -left-6 h-24 w-24 bg-purple-400/40 blur-2xl rounded-full animate-ping z-0' />
              <div className='absolute -bottom-8 -right-8 h-28 w-28 bg-yellow-300/30 blur-2xl rounded-full animate-pulse z-0' />
              <img
                src={loginBg}
                alt='Task Management Illustration'
                className='w-60 object-contain drop-shadow-xl z-20 transform translate-y-3 rotate-[6deg] transition-all duration-500 group-hover:rotate-[9deg]'
              />
              <div className='text-center z-10 space-y-1'>
                <h4 className='text-lg font-semibold text-gray-800'>
                  Manage Your Tasks
                </h4>
                <p className='text-xs text-gray-600'>
                  Stay focused. Stay productive.
                </p>
              </div>
              <div className='absolute top-5 right-5 bg-white/80 border border-gray-100 p-2 rounded-full shadow-md transition-transform duration-300 group-hover:rotate-12'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-indigo-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 17v-6h13M9 11V5m0 0L5 9m4-4l4 4'
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  )
}
