import { useContext, useState } from 'react'
import Dialog from '../Dialog'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { CloseIcon } from 'src/assets/icons'
import loginImage from 'src/assets/images/loginImage.png'
import recapcha from 'src/assets/images/recaptcha-logo.png'
import Input from '../Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../Button'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse, ErrorsEntityType } from 'src/types/utils.type'
import { toast } from 'react-toastify'

export type RegisterFormData = Pick<UserSchema, 'name' | 'email' | 'password' | 'confirm_password'>
const registerSchema = userSchema.pick(['name', 'email', 'password', 'confirm_password'])

export default function RegisterDialog() {
  const { isOpenRegisterDialog, setIsOpenRegisterDialog, setIsOpenLoginDialog } =
    useContext<AppContextInterface>(AppContext)
  const [isNotRobot, setIsNotRobot] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register
  })

  const onSubmit = handleSubmit((data) => {
    const bodyRegister = omit(data, ['confirm_password'])
    registerMutation.mutate(bodyRegister, {
      onSuccess: () => {
        toast.success('Bạn đã đăng ký tài khoản thành công')
        setIsOpenLoginDialog(true)
        reset()
        setIsNotRobot(false)
        setIsOpenRegisterDialog(false)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<RegisterFormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.errors
          console.log(formError)
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<RegisterFormData, 'confirm_password'>, {
                type: 'Server',
                message: (
                  formError[key as keyof Omit<RegisterFormData, 'confirm_password'>] as unknown as ErrorsEntityType
                ).msg
              })
            })
          }
        }
      }
    })
  })

  return (
    <Dialog
      isOpen={isOpenRegisterDialog}
      onOpenChange={setIsOpenRegisterDialog}
      renderDialog={
        <div className='relative flex w-[780px]  rounded-3xl bg-white text-xs'>
          <div
            onClick={() => setIsOpenRegisterDialog(false)}
            className='absolute right-[-12px] top-[-12px] flex h-8 w-8 items-center justify-center rounded-[50%] bg-white shadow-md'
          >
            <CloseIcon className='h-5 w-5 cursor-pointer' stroke='gray' stroke_width={2.5} />
          </div>
          <div className='flex max-h-[520px] flex-grow flex-col overflow-auto scroll-smooth p-10'>
            <div className='mt-4 text-2xl font-bold text-[#010101]'>Đăng ký tài khoản</div>
            <span className='mt-[10px] text-lg'>Tạo tài khoản</span>
            <form className='mt-5' onSubmit={onSubmit}>
              <label className='text-base' htmlFor='name'>
                Vui lòng cho biết tên bạn
              </label>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='Nguyễn Văn A'
                register={register}
                errorMessage={errors.name?.message}
              />
              <label className='mt-3 block text-base' htmlFor='email'>
                Email
              </label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='abc@gmail.com'
                register={register}
                errorMessage={errors.email?.message}
              />
              <label className='mt-3 block text-base' htmlFor='password'>
                Đặt mật khẩu
              </label>
              <Input
                id='password'
                type='password'
                name='password'
                placeholder='Mật khẩu'
                className='relative'
                register={register}
                errorMessage={errors.password?.message}
              />
              <label className='mt-3 block text-base' htmlFor='confirm_password'>
                Nhập lại mật khẩu
              </label>
              <Input
                type='password'
                id='confirm_password'
                name='confirm_password'
                placeholder='Mật khẩu'
                className='relative'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-7 flex w-3/4 items-center justify-between rounded border-[1px] border-slate-300 bg-[#f9f9f9] px-3 py-2 shadow-sm'>
                <div className='flex items-center'>
                  <Input
                    type='checkbox'
                    className='hidden h-7 w-7'
                    checked={isNotRobot}
                    onChange={() => console.log("i'm not robot")}
                  />
                  {isNotRobot ? (
                    <div className='mr-2 h-7 w-4 translate-x-1 translate-y-[-8px] rotate-45 select-none border-[3px] border-b-green-600 border-l-transparent border-r-green-600 border-t-transparent'></div>
                  ) : (
                    <div
                      onClick={() => setIsNotRobot(true)}
                      className='block h-7 w-7 rounded border-2 border-gray-300'
                    />
                  )}
                  <span
                    onClick={() => setIsNotRobot(true)}
                    className='ml-3 cursor-pointer select-none text-sm font-normal text-black'
                  >
                    I'm not a robot
                  </span>
                </div>
                <div
                  onClick={() => setIsNotRobot(true)}
                  className='flex cursor-pointer select-none flex-col items-center'
                >
                  <div className='h-9 w-9'>
                    <img className='h-full w-full object-contain' src={recapcha} alt='' />
                  </div>
                  <span className='text-[10px] font-light'>reCAPTCHA</span>
                  <span className='text-[8px]'>Private - Terms</span>
                </div>
              </div>
              <Button
                type='submit'
                disabled={isNotRobot === false || registerMutation.isPending}
                isLoading={registerMutation.isPending}
                className='mt-7 w-full select-none rounded-[4px] border-none text-center text-lg font-medium leading-[44px] text-white'
              >
                Tạo tài khoản
              </Button>
            </form>
          </div>
          <div className='flex flex-col justify-center rounded-r-3xl bg-[#f2f6ff] px-10 py-12'>
            <div className='h-[298px] w-[200px]'>
              <img className='h-full w-full object-cover' src={loginImage} alt='' />
            </div>
            <div className='mt-8 flex flex-col items-center gap-[5px]'>
              <span className='text-sm font-bold text-[#233b76]'>Mua sắm tại HanoiComputer</span>
              <span className='text-sm font-normal text-[#233b76]'>Siêu ưu đãi mỗi ngày</span>
            </div>
          </div>
        </div>
      }
    />
  )
}
