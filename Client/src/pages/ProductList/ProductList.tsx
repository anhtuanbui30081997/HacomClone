import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CartIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SettingIcon,
  TruckIcon
} from 'src/assets/icons'
import logo from 'src/assets/images/logo-hacom-since-2001.png'
import path from 'src/constants/path'
import slide1 from 'src/assets/images/slide1.jpg'
import slide2 from 'src/assets/images/slide2.png'
import slide3 from 'src/assets/images/slide3.jpg'
import slide4 from 'src/assets/images/slide4.png'
import slide5 from 'src/assets/images/slide5.png'
import slide6 from 'src/assets/images/slide6.jpg'
import slide7 from 'src/assets/images/slide7.jpg'
import slide8 from 'src/assets/images/slide8.png'
import product1 from 'src/assets/images/product1.png'
import classNames from 'classnames'
import ProductRating from './ProductRating'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'

// Internal Component
const SlideImage = (props: { className: string; slide: string }) => {
  return (
    <div className={props.className}>
      <img src={props.slide} className='h-full w-full object-cover' alt='...' />
    </div>
  )
}

const SlideShow = () => {
  const [active, setActive] = useState<number>(0)
  const imagesSlide = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8]

  useEffect(() => {
    let id = setInterval(() => {
      setActive((prevActive) => (prevActive === imagesSlide.length - 1 ? 0 : prevActive + 1))
    }, 4000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className='relative w-full'>
      <div className='relative w-full overflow-hidden xl:h-48 2xl:h-64'>
        {imagesSlide.map((slide, index) => {
          return (
            <div
              key={index}
              className={classNames('absolute right-[-50%] flex h-full w-[50%] duration-200 ease-linear', {
                'translate-x-[-200%] justify-start': active === index,
                'translate-x-[-100%] justify-end': active + 1 === index || (active === 7 && index === 0),
                'translate-x-[-300%]': active - 1 === index || (active === 0 && index === 7)
              })}
            >
              <SlideImage slide={slide} className={'w-[99.2%]'} />
            </div>
          )
        })}
      </div>
      {/* Slider controls */}
      <button
        type='button'
        className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
        onClick={() => setActive((prevActive) => (prevActive === 0 ? imagesSlide.length - 1 : prevActive - 1))}
      >
        <ChevronLeftIcon className='h-8 w-8 text-red-500' />
      </button>
      <button
        type='button'
        className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
        onClick={() => setActive((prevActive) => (prevActive === imagesSlide.length - 1 ? 0 : prevActive + 1))}
      >
        <span className='inline-flex h-10 w-10 items-center justify-center rounded-full'>
          <ChevronRightIcon className='h-8 w-8 text-red-500' />
        </span>
      </button>
    </div>
  )
}

const Title = (props: { children: React.ReactNode }) => {
  return <div className='border-b border-[#d9d9d9] py-3 text-sm font-bold uppercase'>{props.children}</div>
}

const FilterGroupItem = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex items-center'>{children}</div>
}

const FilterItem = ({ name, quantity }: { name: string; quantity: number }) => {
  return (
    <div className='flex w-full items-center gap-2 py-2'>
      <input type='checkbox' className='cursor-pointer' id='asus' />
      <label htmlFor='asus' className='cursor-pointer text-xs'>
        {name} ({quantity})
      </label>
    </div>
  )
}

const ProductItem = () => {
  return (
    <Link to={'/'}>
      <div
        className='shadow-custom overflow-hidden rounded-lg bg-white transition-transform duration-100 
      hover:translate-y-[-0.04rem]'
      >
        <div className='relative w-full pt-[100%]'>
          <img src={product1} alt='' className='absolute left-0 top-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='p-3 text-xs'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <ProductRating rating={4} />
              <span className='ml-1 text-xs'>(2)</span>
            </div>
            <span className='rounded-sm bg-[#f1f1f1] px-[5px] py-[3px] uppercase xl:text-[10px] 2xl:text-xs'>
              Mã: LTLV022
            </span>
          </div>
          <div className='line-clamp-3 pt-[10px] font-semibold text-[#333e48]'>
            LAPTOP LENOVO THINKBOOK 16 GEN 6 (21KHA0A4VN) (I5 1335U/16GB RAM/512GB SSD/16 WUXGA/DOS/XÁM)
          </div>
          <ul className='mb-[10px] mt-3 list-inside list-disc overflow-hidden leading-[18px] xl:h-[104px] 2xl:h-[187px]'>
            <li className='list-item'>CPU: Intel® Core™ i5-1335U, 10C (2P + 8E)</li>
            <li className='list-item'>RAM: 16GB (2x8GB) SO-DIMM DDR5-5200 (Tối đa 64GB)</li>
            <li className='list-item'>Ổ cứng: 512GB SSD M.2 2242 PCIe® 3.0x4 NVMe® (Còn trống 1 khe)</li>
            <li className='list-item'>VGA: Integrated Intel Iris Xe Graphics</li>
            <li className='list-item'>Màn hình: 16" IPS 300nits Anti-glare, 100% sRGB</li>
            <li className='list-item'>Màu sắc: Xám</li>
            <li className='list-item'>Chất liệu: Nhôm</li>
            <li className='list-item'>OS: DOS</li>
          </ul>
          <div className='flex items-center justify-between'>
            <span className='font-helvetica text-[15px] text-[#666] line-through'>18.999.000₫</span>
            <span className='text-red-500'>(Tiết kiệm: 11% )</span>
          </div>
          <div className='mt-2 font-helvetica text-[22px] font-semibold text-black'>16.999.000₫</div>
          <div className='mt-2 flex items-center justify-between'>
            <div className='flex items-center text-green-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
              </svg>
              <span className='text-[13px]'>Sẵn hàng</span>
            </div>
            <div className='rounded-full bg-red-500 p-1 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Export Component
export default function ProductList() {
  const { data: dataPruchaseList } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchaseApi.getPurchaseList(1)
  })
  const productList = dataPruchaseList?.data.data

  return (
    <div className='bg-white py-6'>
      <div className='container mx-auto'>
        {/* Top Search */}
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-2'>
            <img src={logo} alt='logo-hacom' />
          </div>
          <div className='col-span-10'>
            <div className='grid grid-cols-3 items-center'>
              <div className='col-span-2'>
                <form className='flex xl:h-8 2xl:h-10'>
                  <input
                    type='text'
                    className='grow rounded-l-full border-2 border-red-500 px-5 py-1 text-xs text-[#000] outline-none'
                    placeholder='Nhập tên sản phẩm, từ khóa cần tìm'
                  />
                  <button className='rounded-r-full bg-red-500 px-5 py-1 text-white'>
                    <SearchIcon className='h-4 w-4' />
                  </button>
                </form>
              </div>
              <div className='col-span-1'>
                <div className='flex items-center justify-center xl:gap-3 2xl:gap-8'>
                  <div className='flex pl-2'>
                    <div className='flex items-center gap-1'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full border border-[#666] shadow-sm'>
                        <SettingIcon className='h-5 w-5' stroke='#666' />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-xs text-[#333e48]'>Xây dựng</span>
                        <span className='text-xs text-[#333e48]'>cấu hình</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-[#666] shadow-sm'>
                      <TruckIcon />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-xs text-[#333e48]'>Tra cứu</span>
                      <span className='text-xs text-[#333e48]'>đơn hàng</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CartIcon />
                    <span className='text-xs text-[#333e48]'>Giỏ hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Link you are here*/}
        <div className='mt-8 flex items-center'>
          <Link to={path.home} className='text-sm font-semibold text-[#555]'>
            Trang chủ
          </Link>
          <span className='mx-2'>
            <ChevronRightIcon />
          </span>
          <Link to={path.laptop_tablet_mobile} className='text-sm font-semibold text-[#243a76]'>
            Laptop, Macbook, Surface
          </Link>
        </div>

        {/* Title */}
        <div className='mt-8 w-max border-b-2 border-[#243a76]'>
          <span className='text-2xl font-semibold uppercase text-[#243a76]'>Laptop, macbook, surface</span>
          <span className='ml-2 text-xs text-gray-400'>(Tổng 614 sản phẩm)</span>
        </div>

        {/* Slide Show */}
        <div className='mt-5'>
          <SlideShow />
        </div>

        {/* Body */}
        <div className='mt-5 flex flex-row'>
          {/* Left */}
          <div className='w-[280px] shrink-0 px-[10px] py-0'>
            <div className='my-[10px] rounded border border-[#d9d9d9] text-center text-xs font-semibold uppercase leading-8'>
              Lọc sản phẩm
            </div>
            {/* Danh mục */}
            <div>
              <Title>Danh mục</Title>
              <div className='px-[10px] py-3'>
                <div className='mb-2 flex items-center gap-1'>
                  <ChevronDoubleRightIcon />
                  <Link to={'/'} className='text-xs font-bold capitalize'>
                    laptop, máy tính xách tay
                  </Link>
                </div>
                <div className='mb-2 flex items-center gap-1'>
                  <ChevronDoubleRightIcon />
                  <Link to={'/'} className='text-xs font-bold capitalize'>
                    máy tính bảng
                  </Link>
                </div>
                <div className='mb-2 flex items-center gap-1'>
                  <ChevronDoubleRightIcon />
                  <Link to={'/'} className='text-xs font-bold capitalize'>
                    điện thoại iPhone
                  </Link>
                </div>
                <div className='mb-2 flex items-center gap-1'>
                  <ChevronDoubleRightIcon />
                  <Link to={'/'} className='text-xs font-bold capitalize'>
                    máy đọc sách
                  </Link>
                </div>
                <div className='flex items-center gap-1'>
                  <ChevronDoubleRightIcon />
                  <Link to={'/'} className='text-xs font-bold capitalize'>
                    đồng hồ thông minh
                  </Link>
                </div>
              </div>
            </div>
            {/* Hãng sản xuất */}
            <div>
              <Title>Hãng sản xuất</Title>
              <FilterGroupItem>
                <FilterItem name='ASUS' quantity={52} />
                <FilterItem name='ACER' quantity={50} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='AMAZON' quantity={6} />
                <FilterItem name='APPLE' quantity={98} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='CHUWI' quantity={1} />
                <FilterItem name='DELL' quantity={114} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='HP' quantity={111} />
                <FilterItem name='IMIN' quantity={1} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='LENOVO' quantity={96} />
                <FilterItem name='LG' quantity={13} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='MICROSOFT' quantity={26} />
                <FilterItem name='MSI' quantity={24} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='SAMSUNG' quantity={17} />
                <FilterItem name='VAIO' quantity={4} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='XIAOMI' quantity={2} />
              </FilterGroupItem>
            </div>
            {/* Phong cách */}
            <div>
              <Title>Phong cách</Title>
            </div>
            {/* Giới tính */}
            <div>
              <Title>Giới tính</Title>
            </div>
            {/* Màu sắc */}
            <div>
              <Title>Màu sắc</Title>
            </div>
            {/* Phân loại LAPTOP */}
            <div>
              <Title>Phân loại LAPTOP</Title>
            </div>
            {/* CPU */}
            <div>
              <Title>CPU</Title>
            </div>
            {/* CPU */}
            <div>
              <Title>CPU</Title>
            </div>
            {/* RAM */}
            <div>
              <Title>RAM</Title>
            </div>
            {/* Ổ cứng */}
            <div>
              <Title>Ổ cứng</Title>
            </div>
            {/* VGA - Card màn hình */}
            <div>
              <Title>VGA - Card màn hình</Title>
            </div>
            {/* Kích thước màn hình */}
            <div>
              <Title>Kích thước màn hình</Title>
            </div>
            {/* Độ phân giải màn hình */}
            <div>
              <Title>Độ phân giải màn hình</Title>
            </div>
            {/* Cảm ứng màn hình */}
            <div>
              <Title>Cảm ứng màn hình</Title>
            </div>
            {/* Tần số màn hình */}
            <div>
              <Title>Tần số màn hình</Title>
            </div>
            {/* Hệ điều hành */}
            <div>
              <Title>Hệ điều hành</Title>
            </div>
          </div>

          {/* Right */}
          <div className='grow'>
            <div className='w-full bg-[#f2f2f2] p-3'>
              {/* Filter Top */}
              <div className='flex items-center gap-5'>
                {/* Tình trạng kho hàng */}
                <select name='' id='' className='h-7 w-[180px] rounded-sm border pl-1 text-sm outline-none'>
                  <option value='' className='text text-[13px]'>
                    Tình trạng kho hàng
                  </option>
                  <option value=''>Còn hàng</option>
                </select>
                {/* Kho */}
                <select name='' id='' className='h-7 w-[302px] rounded-sm border pl-1 text-[13px] outline-none'>
                  <option value='' className='text-[13px]'>
                    Tất cả kho
                  </option>
                  <option value=''> 131 Lê Thanh Nghị - Hai Bà Trưng - Hà Nội </option>
                  <option value=''> 43 Thái Hà - Đống Đa - Hà Nội </option>
                  <option value=''> 406 Tô Hiệu - Lê Chân - Hải Phòng </option>
                  <option value=''> 79 Nguyễn Văn Huyên - Cầu Giấy - Hà Nội </option>
                  <option value=''> 511 Quang Trung - Hà Đông - Hà Nội </option>
                </select>
                {/* Lọc the giá tiền */}
                <div>
                  <form action='' className='flex items-center gap-1'>
                    <div className='text-[13px] xl:w-16 2xl:w-32'>Lọc theo sản phẩm:</div>
                    <div className=' flex items-center rounded-sm border border-[#ccc] bg-white p-[6px] text-[13px]'>
                      <input type='text' value='649.000' className='mr-1 text-end outline-none xl:w-[76px]' />
                      <div className='text-[13px]'>₫</div>
                    </div>
                    <div> - </div>
                    <div className='flex items-center rounded-sm border border-[#ccc] bg-white p-[6px] text-[13px]'>
                      <input type='text' value='37.999.000' className='mr-1 text-end outline-none xl:w-[76px]' />
                      <div className='text-[13px]'>₫</div>
                    </div>
                    <button className=' rounded bg-[#243a76] px-5 py-[6px] text-sm text-white'>Lọc</button>
                  </form>
                </div>
              </div>
              {/* Filter Bottom */}
              <div className='mt-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className='rounded-sm border border-dashed border-[#243a76] 
                  px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
                  >
                    Hàng mới
                  </div>
                  <div
                    className='rounded-sm border border-dashed border-[#243a76] 
                  px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
                  >
                    Xem nhiều
                  </div>
                  <div
                    className='rounded-sm border border-dashed border-[#243a76] 
                  px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
                  >
                    Giá giảm nhiều
                  </div>
                  <div
                    className='rounded-sm border border-dashed border-[#243a76] 
                  px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
                  >
                    Giá tăng dần
                  </div>
                  <div
                    className='rounded-sm border border-dashed border-[#243a76] 
                  px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
                  >
                    Giá Giảm dần
                  </div>
                </div>
                <div>
                  <select name='' id='' className='h-7 w-[130px] rounded-sm border pl-1 text-sm outline-none'>
                    <option value='' className='text text-[13px]'>
                      Lọc sản phẩm
                    </option>
                    <option value=''>đánh giá</option>
                    <option value=''>tên từ a - z</option>
                  </select>
                </div>
                {/* Phân trang */}
                <div className='flex items-center gap-1'>
                  <button className='rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
                    prev
                  </button>
                  <button className='rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
                    1
                  </button>
                  <button className='rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
                    2
                  </button>
                  <button className='rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
                    3
                  </button>
                  <button className='rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
                    next
                  </button>
                </div>
              </div>
            </div>
            {/* Product List */}
            <div className='py-5'>
              <div className='grid grid-cols-4 gap-3'>
                {productList
                  ? productList.map((productItem) => (
                      <div className='col-span-1'>
                        <ProductItem />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
