import {
  FacebookIcon,
  GiftIcon,
  GoogleIcon,
  HelpIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  ServiceIcon,
  UserIcon
} from 'src/assets/icons'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import showroomApi from 'src/apis/showroom.api'
import onlineSellerApi from 'src/apis/onlineSeller.api'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import Showroom from '../Showroom'
import path from 'src/constants/path'

/**
 * Internal component
 * @returns
 */
const UserService = () => {
  const { setIsOpenLoginDialog, setIsOpenRegisterDialog, profile, setProfile, setIsAuthenticated } =
    useContext<AppContextInterface>(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setProfile(null)
      setIsAuthenticated(false)
      toast.success('Đăng xuất thành công')
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex cursor-pointer flex-col rounded-sm bg-white p-4 shadow-md'>
      {profile ? (
        <div
          onClick={handleLogout}
          className='mb-1 w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'
        >
          Đăng xuất
        </div>
      ) : (
        <div>
          <div
            onClick={() => setIsOpenLoginDialog(true)}
            className='mb-1 w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'
          >
            Đăng nhập
          </div>
          <div
            onClick={() => setIsOpenRegisterDialog(true)}
            className='mb-1 w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'
          >
            Đăng ký
          </div>
          <Link
            to={path.admin}
            className='mb-1 block w-full min-w-[206px] rounded-sm bg-yellow-400 p-2 text-center text-xs font-medium'
          >
            Admin
          </Link>
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
      )}
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

const NorthRegion = () => {
  const { data: dataHanoi } = useQuery({ queryKey: ['showroom', 0], queryFn: () => showroomApi.getShowrooms(0) })
  const { data: dataNorth } = useQuery({ queryKey: ['showroom', 1], queryFn: () => showroomApi.getShowrooms(1) })
  const showroomsHanoi = dataHanoi?.data.data
  const showroomsNorth = dataNorth?.data.data

  return (
    <div className='max-h-[80vh] overflow-auto rounded bg-white p-[25px] xl:w-[1200px] 2xl:w-[1650px]'>
      <div className='grid grid-cols-2 gap-10 bg-white px-5'>
        <div className='col-span-1'>
          <p className='mx-auto my-4 w-fit rounded-full border-2 border-[#ed1b24] px-[25px] py-[10px] text-[1.1rem] font-semibold uppercase text-black'>
            hacom hà nội
          </p>
          <div className='grid grid-cols-2 gap-5'>
            {showroomsHanoi?.map((showroom, index) => <Showroom key={showroom._id} {...showroom} index={index} />)}
          </div>
        </div>
        <div className='col-span-1'>
          <p className='mx-auto my-4 w-fit rounded-full border-2 border-[#ed1b24] px-[25px] py-[10px] text-[1.1rem] font-semibold uppercase text-black'>
            hacom miền bắc
          </p>
          <div className='grid grid-cols-2 gap-5'>
            {showroomsNorth?.map((showroom, index) => <Showroom key={showroom._id} {...showroom} index={index} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

const ShopingOnline = () => {
  const { data: dataOnlineSellers } = useQuery({
    queryKey: ['online-seller'],
    queryFn: onlineSellerApi.getAllOnlineSellers
  })
  const personalSellers = dataOnlineSellers?.data.data.filter((seller) => seller.seller_type === 0)
  const interpriseSellers = dataOnlineSellers?.data.data.filter((seller) => seller.seller_type === 1)
  const OnlineSeller = ({
    className,
    mail,
    name,
    phone_number
  }: {
    className: string
    name: string
    mail: string
    phone_number: string
  }) => {
    return (
      <div className={className}>
        <div className='text-[13px] font-bold text-[#ed1c24]'>{name}</div>
        <div className='mt-3 flex items-center justify-center'>
          <MailIcon className='h-4 w-4' fill='black' stroke='white' />
          <p className='ml-1 text-xs'>{mail}</p>
        </div>
        <div className='mt-3 flex items-center justify-center'>
          <PhoneIcon className='h-3 w-3' fill='black' />
          <p className='ml-1 text-xs'>{phone_number}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-h-[80vh] overflow-auto rounded bg-white p-[25px] xl:w-[1200px] 2xl:w-[1650px]'>
      <div className='mx-auto mt-4 w-fit rounded-full border-2 border-[#ed1b24] px-[25px] py-[10px] '>
        <div className='text-[1.1rem] font-semibold uppercase text-black'>
          Bán hàng online toàn quốc(8h - 24h hàng ngày)
        </div>
        <p className='text-center text-sm font-semibold capitalize italic'>(Miễn phí giao hàng toàn quốc)</p>
      </div>
      <div className='mt-9 grid grid-cols-2 gap-10 bg-white px-5'>
        <div className='col-span-1'>
          <div className='rounded-lg bg-[#ed1c24] py-3 text-center font-semibold text-white'>
            <div className='text-lg uppercase'>Bộ phận khách hàng cá nhân</div>
            <p className='text-sm italic'>(Tối Ưu và Chuyên sâu)</p>
          </div>
          <div className='mt-[18px] grid grid-cols-3 gap-2'>
            {personalSellers?.map((seller) => (
              <OnlineSeller
                key={seller._id}
                className='rounded-md border border-[#2d2b75] py-2 text-center'
                mail={seller.email}
                name={seller.name}
                phone_number={seller.phone_number}
              />
            ))}
          </div>
        </div>
        <div className='col-span-1'>
          <div className='rounded-lg bg-[#2d2b75] py-3 text-center font-semibold text-white'>
            <div className='text-lg uppercase'>Bộ phận khách hàng doanh nghiệp</div>
            <p className='text-sm italic'>(Cam kết giá tốt nhất cho Khách hàng Doanh nghiệp)</p>
          </div>
          <div className='mt-[18px] grid grid-cols-2 gap-2'>
            {interpriseSellers?.map((seller) => (
              <OnlineSeller
                key={seller._id}
                className='rounded-md border border-[#ed1c24] py-2 text-center'
                mail={seller.email}
                name={seller.name}
                phone_number={seller.phone_number}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const SouthernRegion = () => {
  const { data: dataSorth } = useQuery({ queryKey: ['showroom', 0], queryFn: () => showroomApi.getShowrooms(3) })
  const showroomsSorth = dataSorth?.data.data
  return (
    <div className='max-h-[80vh] overflow-auto rounded bg-white p-[25px] xl:w-[1200px] 2xl:w-[1650px]'>
      <div className='px-5'>
        <p className='mx-auto my-4 w-fit rounded-full border-2 border-[#ed1b24] px-[25px] py-[10px] text-[1.1rem] font-semibold uppercase text-black'>
          hacom miền trung
        </p>
        <div className='grid grid-cols-2 gap-5'>
          {showroomsSorth?.map((showroom, index) => <Showroom key={showroom._id} {...showroom} index={index} />)}
        </div>
      </div>
    </div>
  )
}

const CenterRegion = () => {
  const { data: dataCenter } = useQuery({ queryKey: ['showroom', 0], queryFn: () => showroomApi.getShowrooms(2) })
  const showroomsCenter = dataCenter?.data.data
  return (
    <div className='max-h-[80vh] overflow-auto rounded bg-white p-[25px] xl:w-[1200px] 2xl:w-[1650px]'>
      <div className='px-5'>
        <p className='mx-auto my-4 w-fit rounded-full border-2 border-[#ed1b24] px-[25px] py-[10px] text-[1.1rem] font-semibold uppercase text-black'>
          hacom miền trung
        </p>
        <div className='grid grid-cols-2 gap-5'>
          {showroomsCenter?.map((showroom, index) => <Showroom key={showroom._id} {...showroom} index={index} />)}
        </div>
      </div>
    </div>
  )
}
/**
 * Default component
 * @returns Header component
 */
export default function Header() {
  const { profile } = useContext<AppContextInterface>(AppContext)
  return (
    <header className='border-b bg-neutral-100'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Header Top Left */}
        <div className='flex items-center'>
          <div className='flex items-center'>
            <PhoneIcon className='h-[11px] w-[11px]' />
            <span className='mx-1 text-[11px]'>Gọi mua hàng:</span>
            <span className='text-[11px] font-bold'>1900.1903</span>
          </div>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<ShopingOnline />}
            overlay={true}
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Mua hàng online</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<NorthRegion />}
            overlay={true}
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Miền bắc</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<CenterRegion />}
            overlay={true}
          >
            <PhoneIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            <span className='ml-1 text-xs capitalize'>Miền trung</span>
          </Popover>
          <Popover
            className='gradient z-[9999] ml-4 flex h-[30px] items-center rounded-full px-[10px] text-white ease-in-out'
            renderPopover={<SouthernRegion />}
            overlay={true}
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
          <Popover
            className='gradient flex cursor-pointer items-center rounded-full px-[10px] py-[8px]'
            renderPopover={<UserService />}
          >
            <UserIcon className='h-3 w-3' stroke='white' stroke_width={3} />
            {profile ? (
              <span className='ml-1 text-xs text-white'>{profile.name}</span>
            ) : (
              <span className='ml-1 text-xs text-white'>Tài khoản</span>
            )}
          </Popover>
        </div>
      </div>
    </header>
  )
}
