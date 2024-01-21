import customerImage from 'src/assets/images/khachang.png'
import client1 from 'src/assets/images/client1.jpg'
import client2 from 'src/assets/images/client2.jpg'
import client3 from 'src/assets/images/client3.jpg'
import client4 from 'src/assets/images/client4.jpg'
import Input from '../Input'
import Button from '../Button'
import Showroom from '../Showroom'
import { useQuery } from '@tanstack/react-query'
import showroomApi from 'src/apis/showroom.api'
import { ArrowPathIcon, CarIcon, ChatBubbleLeftRightIcon, CreditCartIcon } from 'src/assets/icons'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { data } = useQuery({ queryKey: ['showroom'], queryFn: () => showroomApi.getAllShowrooms() })
  const showrooms = data?.data.data

  return (
    <footer className='mt-5'>
      <div className='container mx-auto grid min-h-[384px] grid-cols-12 gap-3'>
        <div className='gradient col-span-3 flex items-center justify-center rounded-lg'>
          <img className='w-full object-cover' src={customerImage} alt='' />
        </div>
        <div className='gradient col-span-9 h-full rounded-lg p-[15px]'>
          <div className='grid h-full grid-cols-4 gap-3'>
            <div className='col-span-1'>
              <img className='h-full w-full rounded-md object-cover' src={client1} alt='' />
            </div>
            <div className='col-span-1'>
              <img className='h-full w-full rounded-md object-cover' src={client2} alt='' />
            </div>
            <div className='col-span-1'>
              <img className='h-full w-full rounded-md object-cover' src={client3} alt='' />
            </div>
            <div className='col-span-1'>
              <img className='h-full w-full rounded-md object-cover' src={client4} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 bg-[#202c43] px-5 pb-10 pt-5'>
        <div className='container mx-auto flex flex-col items-center justify-center'>
          <div className='my-[18px] text-lg font-bold uppercase text-white'>
            Đăng ký nhận email thông báo khuyến mại hoặc để được tư vấn miễn phí
          </div>
          <form action='' className='flex overflow-hidden'>
            <Input
              name='email'
              classNameInput='p-[10px] text-xs h-10 w-[500px] rounded-l outline-none'
              placeholder='Nhập email hoặc số điện thoại của bạn'
            />
            <Button className='h-10 rounded-r bg-[#ed1b24] px-[50px] py-[10px] text-[13px] font-semibold '>Gửi</Button>
          </form>
        </div>
      </div>
      <div className='border-b'>
        <div className='container mx-auto py-4'>
          <div className='flex flex-col items-center'>
            <span className='text-lg font-bold uppercase text-[#333e48]'>Hệ thống các showroom của hacom</span>
            <span className='h-[2px] w-[200px] bg-[#333e48]'></span>
          </div>
          <div className='grid gap-4 xl:grid-cols-3 2xl:grid-cols-4'>
            {showrooms?.map((showroom, index) => (
              <Showroom className='pt-5' key={showroom._id} {...showroom} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className='border-b border-dashed bg-[#fbfbfb]'>
        <div className='container mx-auto grid grid-cols-4 py-7'>
          <div className='flex items-center'>
            <CarIcon stroke_width={1} className='h-12 w-12 text-red-500' />
            <div className='ml-3 flex flex-col'>
              <span className='text-base font-bold uppercase'>chính sách giao hàng</span>
              <span className='text-xs'>Nhận hàng và thanh toán tại nhà</span>
            </div>
          </div>
          <div className='flex items-center'>
            <ArrowPathIcon stroke_width={1} className='h-11 w-11 text-red-500' />
            <div className='ml-3 flex flex-col'>
              <span className='text-base font-bold uppercase'>đổi trả dễ dàng</span>
              <span className='text-xs'>1 đổi 1 trong vòng 15 ngày</span>
            </div>
          </div>
          <div className='flex items-center'>
            <CreditCartIcon stroke_width={1} className='h-11 w-11 text-red-500' />
            <div className='ml-3 flex flex-col'>
              <span className='text-base font-bold uppercase'>thanh toán tiện lợi</span>
              <span className='text-xs'>Trả tiền mặt, CK, trả góp 0%</span>
            </div>
          </div>
          <div className='flex items-center'>
            <ChatBubbleLeftRightIcon stroke_width={1} className='h-10 w-10 text-red-500' />
            <div className='ml-3 flex flex-col'>
              <span className='text-base font-bold uppercase'>Hỗ trợ nhiệt tình</span>
              <span className='text-xs'>Tư vấn, giải đáp mọi thắc mắc</span>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#fbfbfb] py-7'>
        <div className='container mx-auto grid grid-cols-4'>
          <div className='flex flex-col gap-2'>
            <div className='text-base font-bold uppercase'>Giới thiệu hacom</div>
            <span className='h-[2px] w-[100px] bg-red-500'></span>
            <Link to={'/'} className='text-xs'>
              Giới thiệu công ty
            </Link>
            <Link to={'/'} className='text-xs'>
              Liên hệ hợp tác kinh doanh
            </Link>
            <Link to={'/'} className='text-xs'>
              Thông tin tuyển dụng
            </Link>
            <Link to={'/'} className='text-xs'>
              Tin công nghệ
            </Link>
            <Link to={'/'} className='text-xs'>
              Tin tức
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-base font-bold uppercase'>Hỗ trợ khách hàng</div>
            <span className='h-[2px] w-[100px] bg-red-500'></span>
            <Link to={'/'} className='text-xs'>
              Tra cứu đơn hàng
            </Link>
            <Link to={'/'} className='text-xs'>
              Hướng dẫn mua hàng trực tuyến
            </Link>
            <Link to={'/'} className='text-xs'>
              Hướng dẫn thanh toán
            </Link>
            <Link to={'/'} className='text-xs'>
              Hướng dẫn mua hàng trả góp
            </Link>
            <Link to={'/'} className='text-xs'>
              In hóa đơn điện tử
            </Link>
            <Link to={'/'} className='text-xs'>
              Góp ý, Khiếu nại
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-base font-bold uppercase'>Chính sách chung</div>
            <span className='h-[2px] w-[100px] bg-red-500'></span>
            <Link to={'/'} className='text-xs'>
              Chính sách, quy định chung
            </Link>
            <Link to={'/'} className='text-xs'>
              Chính sách giao hàng
            </Link>
            <Link to={'/'} className='text-xs'>
              Chính sách bảo hành
            </Link>
            <Link to={'/'} className='text-xs'>
              Chính sách cho doanh nghiệp
            </Link>
            <Link to={'/'} className='text-xs'>
              Chính sách hàng chính hãng
            </Link>
            <Link to={'/'} className='text-xs'>
              Bảo mật thông tin khách hàng
            </Link>
            <Link to={'/'} className='text-xs'>
              Chính sách nhập lại miễn phí
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-base font-bold uppercase'>Thông tin khuyến mại</div>
            <span className='h-[2px] w-[100px] bg-red-500'></span>
            <Link to={'/'} className='text-xs'>
              Thông tin khuyến mại
            </Link>
            <Link to={'/'} className='text-xs'>
              Sản phẩm khuyến mại
            </Link>
            <Link to={'/'} className='text-xs'>
              Sản phẩm mới
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-[#202c43] py-7 text-white'>
        <div className='container mx-auto flex flex-col gap-3'>
          <span className='text-xs'>© 2021 Công ty Cổ phần đầu tư công nghệ HACOM</span>
          <span className='text-xs'>
            Địa chỉ: Tầng 3 Tòa nhà LILAMA, số 124 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội
          </span>
          <span className='text-xs'>GPĐKKD số 0101161194 do Sở KHĐT Tp.Hà Nội cấp ngày 31/8/2001</span>
          <span className='text-xs'>Email: info@hacom.vn. Điện thoại: 1900 1903</span>
        </div>
      </div>
    </footer>
  )
}
