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
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import ProductItem from './ProductItem'
import { CategoryType } from 'src/constants/category.enum'
import categoriesApi from 'src/apis/category.api'
import { toSlug } from 'src/utils/utils'

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

// Export Component
export default function ProductList(props: { category: CategoryType }) {
  const categories = Object.values(CategoryType).filter((value) => typeof value === 'string')
  const title = categories[props.category] as string
  const { data: dataPruchaseList } = useQuery({
    queryKey: ['purchases', props.category],
    queryFn: () => purchaseApi.getPurchaseList(props.category)
  })
  const productList = dataPruchaseList?.data.data
  const { data: dataNestedCategorisList } = useQuery({
    queryKey: ['categories', props.category],
    queryFn: () => categoriesApi.getNestedCategories(props.category)
  })
  const nestedCategories = dataNestedCategorisList?.data.data
  const { data: dataAllParentCategorisList } = useQuery({
    queryKey: ['parent-categories', props.category],
    queryFn: () => categoriesApi.getAllParentCategories(props.category)
  })
  const youAreHereCategories = dataAllParentCategorisList?.data.data

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
          {youAreHereCategories &&
            youAreHereCategories.map((category) => (
              <>
                <span className='mx-2'>
                  <ChevronRightIcon />
                </span>
                <Link
                  to={`/${toSlug(category.name.toLocaleLowerCase().replace(/[ ]/g, '-').split(',').join(''))}`}
                  className='text-sm font-semibold text-[#243a76]'
                >
                  {category.name}
                </Link>
              </>
            ))}
        </div>

        {/* Title */}
        <div className='mt-8 w-max border-b-2 border-[#243a76]'>
          <span className='text-2xl font-bold uppercase text-[#243a76]'>{title.replace(/[A-Z]/g, ' $&').slice(1)}</span>
          <span className='ml-2 text-xs text-gray-400'>(Tổng {productList?.length} sản phẩm)</span>
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
                {nestedCategories &&
                  nestedCategories.map((category) => (
                    <div key={category._id} className='mb-2 flex items-center gap-1'>
                      <ChevronDoubleRightIcon />
                      <Link
                        to={`/${toSlug(category.name.toLocaleLowerCase().replace(/[ ]/g, '-').split(',').join(''))}`}
                        className='text-xs font-bold capitalize'
                      >
                        {category.name}
                      </Link>
                    </div>
                  ))}
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
                      <div key={productItem._id} className='col-span-1'>
                        <ProductItem {...productItem} />
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
