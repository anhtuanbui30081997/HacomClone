import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { ErrorResponse, ErrorsEntityType } from 'src/types/utils.type'
import { LoginFormData, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type AdminAction = 'login' | 'user_management' | 'order_management' | 'category_management' | 'purchage_management'

const loginSchema = userSchema.pick(['email', 'password'])

const Login = (props: { onLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setProfile, setIsAuthenticated } = useContext<AppContextInterface>(AppContext)
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.loginAdmin(data)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setIsAuthenticated(true)
        setProfile(res.data.data.user)
        toast.success('Đăng nhập thành công')
        props.onLogin(true)
        reset()
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginFormData>>(error)) {
          const formError = error.response?.data.errors
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                type: 'Server',
                message: (formError[key as keyof LoginFormData] as unknown as ErrorsEntityType).msg
              })
            })
          }
        }
      }
    })
  })

  return (
    <section className='h-full bg-slate-100'>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Login admin account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
              <div>
                <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  classNameInput='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='admin@gmail.com'
                  register={register}
                  errorMessage={errors.email?.message}
                  classNameError='mt-2 block text-red-500 text-sm'
                />
              </div>
              <div>
                <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <Input
                  className='relative'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  classNameInput='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  register={register}
                  errorMessage={errors.password?.message}
                  classNameError='mt-2 block text-red-500 text-sm'
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex h-5 items-center'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a href='#' className='text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline'>
                  Forgot password?
                </a>
              </div>
              <Button
                type='submit'
                className='bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4'
              >
                Login
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a href='#' className='text-primary-600 dark:text-primary-500 font-medium hover:underline'>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Admin() {
  const [action, setAction] = useState<AdminAction>('login')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { setProfile, setIsAuthenticated } = useContext<AppContextInterface>(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setProfile(null)
      setIsAuthenticated(false)
      setIsAdmin(false)
      toast.success('Đăng xuất thành công')
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='h-screen bg-slate-50 '>
      <div className='container mx-auto h-full shadow-md'>
        <div className='h-full py-5'>
          <div className='flex h-full border-y border-slate-200'>
            <div className=' flex w-1/5 flex-col border-r border-gray-400 p-2 shadow-md'>
              <button
                onClick={() => setAction('login')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'login',
                  ' bg-white text-orange-500': action !== 'login'
                })}
              >
                Login
              </button>
              <button
                disabled={isAdmin === false}
                onClick={() => setAction('user_management')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'user_management',
                  ' bg-white text-orange-500': action !== 'user_management'
                })}
              >
                User Management
              </button>
              <button
                disabled={isAdmin === false}
                onClick={() => setAction('order_management')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'order_management',
                  ' bg-white text-orange-500': action !== 'order_management'
                })}
              >
                Order Management
              </button>
              <button
                disabled={isAdmin === false}
                onClick={() => setAction('category_management')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'category_management',
                  ' bg-white text-orange-500': action !== 'category_management'
                })}
              >
                Category Management
              </button>
              <button
                disabled={isAdmin === false}
                onClick={() => setAction('purchage_management')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'purchage_management',
                  ' bg-white text-orange-500': action !== 'purchage_management'
                })}
              >
                Purchase Mangement
              </button>
              {isAdmin === true && (
                <button
                  onClick={handleLogout}
                  className={classNames('mb-2 rounded border border-red-500 p-2', {
                    ' bg-orange-500 text-white': action === 'purchage_management',
                    ' bg-white text-orange-500': action !== 'purchage_management'
                  })}
                >
                  Logout
                </button>
              )}
            </div>
            <div className='w-4/5 p-2'>
              {action === 'login' && <Login onLogin={setIsAdmin} />}
              {action === 'user_management' && <div className='h-full bg-white'>User Management</div>}
              {action === 'order_management' && <div className='h-full bg-white'>Order Management</div>}
              {action === 'category_management' && <div className='h-full bg-white'>Category Management</div>}
              {action === 'purchage_management' && <div className='h-full bg-white'>Purchase Mangement</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
