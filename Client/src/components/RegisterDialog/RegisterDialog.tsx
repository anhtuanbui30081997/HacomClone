import { useContext, useState } from 'react'
import Dialog from '../Dialog'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { CloseIcon } from 'src/assets/icons'
import loginImage from 'src/assets/images/loginImage.png'
import recapcha from 'src/assets/images/recaptcha-logo.png'

export default function RegisterDialog() {
  const { isOpenRegisterDialog, setIsOpenRegisterDialog } = useContext<AppContextInterface>(AppContext)
  const [isNotRobot, setIsNotRobot] = useState<boolean>(false)
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
            <span className='mt-[10px] text-base'>Tạo tài khoản</span>
            <form className='mt-5'>
              <label className='text-sm' htmlFor='email'>
                Vui lòng cho biết tên bạn
              </label>
              <input
                id='email'
                className='h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                type='text'
                placeholder='Giang'
              />
              <span className='invisible mt-2 block text-red-500'>Tên </span>
              <label className='text-sm' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                type='email'
                placeholder='abc@gmail.com'
              />
              <span className='invisible mt-2 block text-red-500'>Email hoặc mật khẩu không đúng</span>
              <label className='text-sm' htmlFor='password'>
                Đặt mật khẩu
              </label>
              <input
                id='password'
                className='mt-2 h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                type='password'
                placeholder='Mật khẩu'
              />
              <span className='invisible mt-2 block text-red-500'>Email hoặc mật khẩu không đúng</span>
              <label className='text-sm' htmlFor='confirm_password'>
                Nhập lại mật khẩu
              </label>
              <input
                id='confirm_password'
                className='mt-2 h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                type='password'
                placeholder='Nhập lại mật khẩu'
              />
              <span className='invisible mt-2 block text-red-500'>Password không trùng khớp</span>
              <div className='mt-2 flex w-3/4 items-center justify-between rounded border-[1px] border-slate-300 bg-[#f9f9f9] px-3 py-2 shadow-sm'>
                <div className='flex items-center'>
                  <input type='checkbox' className='hidden h-7 w-7' checked={isNotRobot} />
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
              <button
                type='submit'
                className='mt-7 w-full rounded-[4px] border-none bg-[#ed1b24] text-center text-lg font-medium leading-[44px] text-white'
              >
                Tạo tài khoản
              </button>
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
