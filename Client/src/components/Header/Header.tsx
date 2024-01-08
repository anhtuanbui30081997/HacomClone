import {
  FacebookIcon,
  GiftIcon,
  GoogleIcon,
  HelpIcon,
  LocationIcon,
  PhoneIcon,
  ServiceIcon,
  UserIcon
} from 'src/assets/icon'
import Popover from '../Popover'
import { Link } from 'react-router-dom'

/**
 * Internal component
 * @returns
 */
const UserService = () => {
  return (
    <div className='flex flex-col rounded-sm bg-white p-4 shadow-md'>
      <div className='mb-1 w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'>
        Đăng nhập
      </div>
      <div className='mb-1 w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'>
        Đăng ký
      </div>
      <div className='mb-1 flex'>
        <div className='flex h-10 min-w-10 items-center justify-center rounded-l-sm bg-[#c5422e]'>
          <GoogleIcon className='h-4 w-4' stroke='white' stroke_width={3.5} />
        </div>
        <div className='flex h-10 w-full items-center rounded-r-sm bg-[#e44a32] p-2 text-center text-xs font-medium text-white'>
          Đăng nhập bằng Google
        </div>
      </div>
      <div className='mb-1 flex'>
        <div className='flex h-10 min-w-10 items-center justify-center rounded-l-sm bg-[#25268d]'>
          <FacebookIcon className='h-5 w-5' stroke='white' />
        </div>
        <div className='flex h-10 w-full items-center rounded-r-sm bg-[#4454df] p-2 text-center text-xs font-medium text-white'>
          Đăng nhập bằng Facebook
        </div>
      </div>
    </div>
  )
}

const Promotion = () => {
  return (
    <div className='flex flex-col rounded-sm bg-white p-4 shadow-md'>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại Laptop
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại PC
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại linh kiện
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại phụ kiện
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại Học sinh - Sinh viên
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại Giao hàng siêu tốc 2h và miễn phí
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Khuyến mại Vệ sinh PC/Laptop miễn phí
      </Link>
      <Link to={'/'} className='py-2 text-xs'>
        Khuyến mại Ưu đãi hình thức thanh toán
      </Link>
    </div>
  )
}

const Service = () => {
  return (
    <div className='flex flex-col rounded-sm bg-white p-4 shadow-md'>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Tra cứu đơn hàng
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Tra cứu bảo hành
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        In hóa đơn điện tử
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Góp ý, khiếu nại
      </Link>
      <Link to={'/'} className=' py-2 text-xs text-[#333e48]'>
        Bảng giá dich vụ sắp đặt
      </Link>
    </div>
  )
}

const Help = () => {
  return (
    <div className='flex flex-col rounded-sm bg-white p-4 shadow-md'>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách, quy định chung
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách giao hàng
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách bảo hành
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách cho doanh nghiệp
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách hàng chính hãng
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Chính sách nhập lại tính phí
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Hướng dẫn mua hàng trực tuyến
      </Link>
      <Link to={'/'} className='border-b border-slate-300 py-2 text-xs text-[#333e48]'>
        Hướng dẫn thanh toán
      </Link>
      <Link to={'/'} className='py-2 text-xs text-[#333e48]'>
        Hướng dẫn mua hàng trả góp
      </Link>
    </div>
  )
}

/**
 * Default component
 * @returns Header component
 */
export default function Header() {
  return (
    <div className='border-b bg-neutral-100'>
      <div className='container mx-auto flex items-center justify-between px-[10px]'>
        {/* Header Top Left */}
        <div className='flex items-center'>
          <div className='flex items-center'>
            <PhoneIcon className='h-[11px] w-[11px]' />
            <span className='ml-1 text-[11px]'>Gọi mua hàng:</span>
            <span className='text-[11px] font-bold'>1900.1903</span>
          </div>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<UserService />}
            roleType='dialog'
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Mua hàng online</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<UserService />}
            roleType='dialog'
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Miền bắc</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<UserService />}
            roleType='dialog'
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Miền trung</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<UserService />}
            roleType='dialog'
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Miền nam</span>
          </Popover>
        </div>
        {/* Header Top Right */}
        <div className='flex items-center'>
          <Link to={'/'} className='flex cursor-pointer items-center p-[10px]'>
            <LocationIcon />
            <span className='ml-1 text-xs text-[#333e48]'>Tìm cửa hàng gần nhất</span>
          </Link>
          <Popover className='flex cursor-pointer items-center p-[10px]' renderPopover={<Help />}>
            <HelpIcon />
            <span className='ml-1 text-xs text-[#333e48]'>Hỗ trợ</span>
          </Popover>
          <Popover className='flex cursor-pointer items-center p-[10px]' renderPopover={<Service />}>
            <ServiceIcon />
            <span className='ml-1 text-xs text-[#333e48]'>Trung tâm dịch vụ</span>
          </Popover>
          <Popover className='flex cursor-pointer items-center p-[10px]' renderPopover={<Promotion />}>
            <GiftIcon />
            <span className='ml-1 text-xs text-[#333e48]'>Khuyến mãi</span>
          </Popover>
          <Popover className='flex cursor-pointer items-center p-[10px]' renderPopover={<UserService />}>
            <UserIcon className='h-3 w-3' />
            <span className='ml-1 text-xs text-[#333e48]'>Tài khoản</span>
          </Popover>
        </div>
      </div>
    </div>
  )
}
