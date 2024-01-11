import { useContext } from 'react'
import Dialog from '../Dialog'
import { AppContext } from 'src/contexts/app.context'
import { CloseIcon } from 'src/assets/icons'
import loginImage from 'src/assets/images/loginImage.png'

export default function LoginDialog() {
  const { isOpenLoginDialog, setIsOpenLoginDialog } = useContext(AppContext)
  return (
    <Dialog
      isOpen={isOpenLoginDialog}
      onOpenChange={setIsOpenLoginDialog}
      renderDialog={
        <div className='relative flex w-[780px] cursor-pointer rounded-3xl bg-white text-xs'>
          <div
            onClick={() => setIsOpenLoginDialog(false)}
            className='absolute right-[-12px] top-[-12px] flex h-8 w-8 items-center justify-center rounded-[50%] bg-white shadow-md'
          >
            <CloseIcon className='h-5 w-5' stroke='gray' stroke_width={2.5} />
          </div>
          <div className='flex w-[420px] flex-grow flex-col p-6'>
            <div className='mb-2 text-2xl font-bold capitalize text-black'>Xin Chào</div>
            <span className='mb-6 text-sm'>Đăng nhập hoặc Tạo tài khoản</span>
            <form>
              <input
                type='text'
                placeholder='Số điện thoại'
                className=' w-full border-b-2 py-2 text-xl outline-none placeholder:text-xl'
              />
              <span className='mt-2 block text-red-500'>Số điện thoại không đúng</span>
            </form>
          </div>
          <div className='rounded-r-3xl bg-[#f2f6ff] px-10 py-12'>
            <div className='h-[298px] w-[200px]'>
              <img className='h-full w-full object-cover' src={loginImage} alt='' />
            </div>
          </div>
        </div>
      }
    />
  )
}
