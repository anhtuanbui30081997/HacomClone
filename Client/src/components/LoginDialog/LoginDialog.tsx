import { useContext, useState } from 'react'
import Dialog from '../Dialog'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { ChevronLeftIcon, CloseIcon } from 'src/assets/icons'
import loginImage from 'src/assets/images/loginImage.png'
import fbImagin from 'src/assets/images/fb-login.png'
import ggImagin from 'src/assets/images/gg-login.png'
import recapcha from 'src/assets/images/recaptcha-logo.png'
import { Link } from 'react-router-dom'

export default function LoginDialog() {
  const { isOpenLoginDialog, setIsOpenLoginDialog } = useContext<AppContextInterface>(AppContext)
  const [isLoginByEmail, setIsLoginByEmail] = useState<boolean>(false)
  const [isNotRobot, setIsNotRobot] = useState<boolean>(false)
  return (
    <Dialog
      isOpen={isOpenLoginDialog}
      onOpenChange={setIsOpenLoginDialog}
      renderDialog={
        <div className='relative flex w-[780px] rounded-3xl bg-white text-xs'>
          <div
            onClick={() => setIsOpenLoginDialog(false)}
            className='absolute right-[-12px] top-[-12px] flex h-8 w-8 items-center justify-center rounded-[50%] bg-white shadow-md'
          >
            <CloseIcon className='h-5 w-5 cursor-pointer' stroke='gray' stroke_width={2.5} />
          </div>
          {isLoginByEmail ? (
            <div className='flex flex-grow flex-col p-10'>
              <div
                onClick={() => {
                  setIsLoginByEmail(false)
                  setIsNotRobot(false)
                }}
                className='pb-2 pr-2'
              >
                <ChevronLeftIcon className='h-5 w-5 cursor-pointer' stroke='#999' stroke_width={2.5} />
              </div>
              <div className='mt-4 text-2xl font-bold text-[#010101]'>Đăng nhập bằng email</div>
              <span className='mt-[10px] text-sm'>Nhập email và mật khẩu tài khoản HACOM</span>
              <form className='mt-5'>
                <input
                  className='h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                  type='email'
                  placeholder='abc@gmail.com'
                />
                <span className='invisible mt-2 block text-red-500'>Email hoặc mật khẩu không đúng</span>
                <input
                  className='mt-2 h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none'
                  type='password'
                  placeholder='Mật khẩu'
                />
                <span className='invisible mt-2 block text-red-500'>Email hoặc mật khẩu không đúng</span>
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
                  Đăng nhập
                </button>
                <Link to={'/'} className='mt-4 block text-sm text-blue-500'>
                  Quên mật khẩu?
                </Link>
              </form>
            </div>
          ) : (
            <div className='flex w-[420px] flex-grow flex-col p-10'>
              <div className='mb-2 text-2xl font-bold capitalize text-black'>Xin Chào</div>
              <span className='mb-6 text-sm'>Đăng nhập hoặc Tạo tài khoản</span>
              <form>
                <input
                  type='text'
                  placeholder='Số điện thoại'
                  className=' w-full border-b-2 py-2 text-xl outline-none placeholder:text-xl'
                />
                <span className='invisible mt-2 block text-red-500'>Số điện thoại không đúng</span>
                <button
                  type='submit'
                  className='mt-7 w-full rounded-[4px] border-none bg-[#ed1b24] text-center text-lg font-medium leading-10 text-white'
                >
                  Tiếp tục
                </button>
                <button
                  type='button'
                  onClick={() => setIsLoginByEmail(true)}
                  className='mt-[15px] block w-full text-center text-sm text-blue-500'
                >
                  Đăng nhập bằng email
                </button>
              </form>
              <div className='mt-6 flex items-center'>
                <span className='h-[1px] flex-grow bg-[#d7d7d7]'></span>
                <span className='bg-white px-5 text-[15px] text-[#787878]'>Hoặc tiếp tục bằng</span>
                <span className='h-[1px] flex-grow bg-[#d7d7d7]'></span>
              </div>
              <div className='mt-6 flex items-center justify-center gap-5'>
                <div className='h-[60px] w-[60px]'>
                  <img className='h-full w-full rounded-[50%]' src={fbImagin} alt='' />
                </div>
                <div className='h-[60px] w-[60px]'>
                  <img className='h-full w-full rounded-[50%] shadow-lg' src={ggImagin} alt='' />
                </div>
              </div>
              <div className='mt-6 text-center text-[11px] text-[#787878]'>
                Bằng việc tiếp tục bạn đã chấp nhận
                <Link className='text-blue-500 underline' to={'/'}>
                  điều khoản sử dụng
                </Link>
              </div>
            </div>
          )}
          <div className='flex flex-col justify-center rounded-r-3xl bg-[#f2f6ff] px-10 py-12'>
            <div className='h-[298px] w-[200px]'>
              <img className='h-full w-full object-cover' src={loginImage} alt='' />
            </div>
            <div className='mt-8 flex flex-col items-center gap-[5px]'>
              <span className='text-sm font-bold text-[#233b76]'>Mua sắm tại HACOM</span>
              <span className='text-sm font-normal text-[#233b76]'>Siêu ưu đãi mỗi ngày</span>
            </div>
          </div>
        </div>
      }
    />
  )
}
