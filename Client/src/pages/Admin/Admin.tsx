import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { SearchIcon } from 'src/assets/icons'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { ErrorResponse, ErrorsEntityType } from 'src/types/utils.type'
import { CategoryType } from 'src/utils/enums'
import { LoginFormData, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type AdminAction =
  | 'login'
  | 'user_management'
  | 'order_management'
  | 'category_management'
  | 'purchage_management'
  | 'logout'

type RootCategory = 'LaptopMacbookSurface' | 'LaptopGamingDohoa'

const loginSchema = userSchema.pick(['email', 'password'])

const LoginAdmin = (props: { onLogin: () => void }) => {
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
        props.onLogin()
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
                      className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Forgot password?
                </a>
              </div>
              <Button
                type='submit'
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Login
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a href='#' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
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

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const deleteOneUserMutation = useMutation({
    mutationFn: (email: string) => authApi.deleteOneUser({ email })
  })
  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ['users'],
    queryFn: authApi.getAllUsers
  })
  useEffect(() => {
    if (data) {
      setUsers(data.data.data)
    }
  }, [data])

  return (
    <div className='relative h-full overflow-x-auto p-2 shadow-md sm:rounded-lg dark:bg-gray-900'>
      <div className=' bg-white pb-4 md:flex-row md:space-y-0 dark:bg-gray-900'>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
            <SearchIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
          </div>
          <input
            type='text'
            id='table-search-users'
            className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search for users'
          />
        </div>
      </div>
      <table className='w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Role
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={user._id}
                className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
              >
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                    />
                  </div>
                </td>
                <th scope='row' className='flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white'>
                  <div>
                    <div className='text-base font-semibold'>{user.name}</div>
                    <div className='font-normal text-gray-500'>{user.email}</div>
                  </div>
                </th>
                <td className='px-6 py-4'>{user.role === 0 ? 'Admin' : 'User'}</td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      deleteOneUserMutation.mutate(user.email, {
                        onSuccess: () => {
                          toast.success('Delete user thành công')
                        }
                      })
                      users.splice(index, 1)
                      setUsers(users)
                    }}
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const PurchaseManagement = () => {
  const [rootCategory, setRootCategory] = useState<RootCategory>('LaptopMacbookSurface')
  const categories = Object.values(CategoryType).filter((value) => typeof value === 'string')
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    if (e.target.value.includes('Laptop')) {
      console.log('huhu')
    }
  }
  return (
    <div className='h-full bg-slate-200'>
      <form>
        <div className='w-[30%]'>
          <label htmlFor='countries' className='mb-2 block text-sm font-medium text-gray-900'>
            Select an category
          </label>
          <select
            id='countries'
            onChange={handleCategoryChange}
            className='block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          >
            <option selected>Choose a category</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default function Admin() {
  const [action, setAction] = useState<AdminAction>('login')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { profile, setProfile, setIsAuthenticated } = useContext<AppContextInterface>(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setProfile(null)
      setIsAuthenticated(false)
      setAction('login')
      setIsAdmin(false)
      toast.success('Đăng xuất thành công')
    }
  })
  useEffect(() => {
    if (profile === null) {
      setIsAdmin(false)
      setAction('login')
    }
  }, [profile])

  const handleLogin = () => {
    setIsAdmin(true)
    setAction('user_management')
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='h-screen bg-slate-50 '>
      <div className='container mx-auto h-full shadow-md'>
        <div className='h-full py-5'>
          <div className='flex h-full border-y border-slate-200'>
            <div className=' flex w-1/5 flex-col border-r border-gray-400 p-2 shadow-md'>
              <Link
                className='mb-2 rounded border border-red-500 p-2 text-center hover:border-blue-500 hover:bg-orange-500 hover:text-white'
                to={'/'}
              >
                Home
              </Link>
              <button
                onClick={() => setAction('login')}
                className={classNames('mb-2 rounded border border-red-500 p-2', {
                  ' bg-orange-500 text-white': action === 'login',
                  ' bg-white text-orange-500': action !== 'login'
                })}
              >
                Login Admin
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
                    ' bg-orange-500 text-white': action === 'logout',
                    ' bg-white text-orange-500': action !== 'logout'
                  })}
                >
                  Logout Admin
                </button>
              )}
            </div>
            <div className='w-4/5 p-2'>
              {action === 'login' && <LoginAdmin onLogin={handleLogin} />}
              {action === 'user_management' && <UserManagement />}
              {action === 'order_management' && <div className='h-full bg-white'>Order Management</div>}
              {action === 'category_management' && <div className='h-full bg-white'>Category Management</div>}
              {action === 'purchage_management' && <PurchaseManagement />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
