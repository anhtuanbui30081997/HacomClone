import { useContext, useEffect, useMemo, useState } from 'react'
import YouAreHere from '../ProductList/components/YouAreHere'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { formatCurrency, getIdFromNameId } from 'src/utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import ProductRating from '../ProductList/components/ProductRating'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  GiftIcon,
  PhoneIcon,
  ShoppingCartIcon
} from 'src/assets/icons'
import classNames from 'classnames'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/types/purchase.type'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { profile, setIsOpenLoginDialog } = useContext<AppContextInterface>(AppContext)
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  // Convert to get id of product
  const id = getIdFromNameId(nameId as string)
  // Call Api to get current product infomation
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [activeImage, setActiveImage] = useState('')
  const [viewMore, setViewMore] = useState<boolean>(false)
  const [showrooms, setShowrooms] = useState<
    {
      code_showroom: number
      address: string
      quantity: number
    }[]
  >([])
  const [orderQuantity, setOrderQuantity] = useState<number>(1)
  const currentImages = useMemo(() => (product ? product?.images : []), [product])
  const addToCartMutation = useMutation({
    mutationFn: () => purchaseApi.addToCart({ buy_count: orderQuantity, product_id: product?._id as string }),
    onSuccess: (data) => {
      toast.success(data.data.message, { autoClose: 1000 })
      queryClient.invalidateQueries({
        queryKey: ['purchases', purchaseStatus.inCart]
      })
    }
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[activeImageIndex])
    }
    if (product?.showrooms) {
      setShowrooms(product?.showrooms)
    }
  }, [product, activeImageIndex])

  const next = () => {
    if (activeImageIndex + 1 < currentImages.length) {
      setActiveImageIndex((prev) => prev + 1)
    }
  }
  const prev = () => {
    if (activeImageIndex - 1 >= 0) {
      setActiveImageIndex((prev) => prev - 1)
    }
  }
  const chooseActive = (img: string) => {
    const index = currentImages.findIndex((image) => image === img)
    setActiveImageIndex(index)
    setActiveImage(img)
  }

  const handleFilterShowroom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'All' && product?.showrooms) {
      setShowrooms([...product?.showrooms])
    } else {
      const showroomsTemp = product?.showrooms
        ? product.showrooms.filter((showroom) => showroom.address.includes(e.target.value))
        : []
      setShowrooms([...showroomsTemp])
    }
  }

  const handleAddToCart = () => {
    if (profile) {
      // Call API add to cart
      addToCartMutation.mutate()
    } else {
      setIsOpenLoginDialog(true)
    }
  }
  const handleBuyNow = async () => {
    if (profile) {
      const res = await addToCartMutation.mutateAsync()
      const purchase = res.data.data
      navigate(path.cart, {
        state: {
          purchaseId: purchase._id
        }
      })
    } else {
      toast.error('Bạn phải đăng nhập trước')
    }
  }

  if (!product) return null
  return (
    <div className='container mx-auto mb-8'>
      <YouAreHere category={Math.max(...product.categories)} />
      <div className='mt-6 border-b border-b-[#e8e8e8] py-3 text-xl font-medium'>
        LAPTOP ACER ASPIRE 7 A715-76-53PJ (NH.QGESV.007) (I5 12450H/16GB RAM/512GB SSD/15.6 INCH FHD/WIN11/ĐEN)
      </div>
      <div className='relative mt-2 grid grid-cols-8'>
        <div className='col-span-3'>
          <div className='relative w-full border border-[#ccc] pt-[100%] shadow'>
            <button
              className='absolute left-[-36px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center'
              onClick={prev}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 28 28'
                strokeWidth={1.5}
                stroke='black'
                className='h-10 w-10'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <img
              src={activeImage}
              alt={product.name}
              className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
            />
            <button
              className='z-1 absolute right-[-40px] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center'
              onClick={next}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 28 28'
                strokeWidth={1.5}
                stroke='black'
                className='h-10 w-10'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
          <div className='relative mt-4 grid grid-cols-5 gap-2'>
            {currentImages.map((img, index) => {
              const isActive = img === activeImage
              return (
                <div key={index} className='relative h-full w-full pt-[100%] shadow' onClick={() => chooseActive(img)}>
                  <img
                    src={img}
                    alt={product.name}
                    className='absolute left-0 top-0 h-full w-full border border-[#ccc] bg-white object-cover'
                  />
                  {isActive && <div className='absolute inset-0 border-2 border-black' />}
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-span-3 ml-6 text-xs'>
          <div className='flex flex-wrap items-center'>
            <div>
              Mã SP: <span className='text-[#288ad6]'>{product.product_code}</span>
            </div>
            <span className='mx-2'>|</span>
            <div className='flex items-center justify-center gap-1'>
              <span>Đánh giá:</span>
              <ProductRating rating={product.rating ? product.rating : 0} />
              <span className='text-[#288ad6]'>{product.rating ? product.rating : 0}</span>
            </div>
            <span className='mx-2'>|</span>
            <div>
              Bình luận: <span className='text-[#288ad6]'>{product.comments}</span>
            </div>
            <span className='mx-2'>|</span>
            <div>
              Lượt xem: <span className='text-[#288ad6]'>{product.views}</span>
            </div>
          </div>
          <div className='my-3'>
            <div className='text-sm font-medium'>Thông số sản phẩm</div>
            <ul
              className={classNames(
                'mb-[10px] mt-2 list-inside list-circle overflow-hidden p-1 leading-[22px] 2xl:text-sm 2xl:leading-7',
                {
                  'h-[134px]': viewMore === false,
                  'h-[189px': viewMore === true
                }
              )}
            >
              {product.specifications.map((item) => (
                <li key={`${item}`} className='list-item'>
                  {item}
                </li>
              ))}
            </ul>
            <button className='bg-[#f5f5f5] px-4 py-2' onClick={() => setViewMore((prev) => !prev)}>
              {viewMore ? (
                <div className='flex items-center gap-1'>
                  Thu Gọn <ChevronUpIcon />
                </div>
              ) : (
                <div className='flex items-center gap-1'>
                  Xem Thêm <ChevronDownIcon />
                </div>
              )}
            </button>
          </div>
          <div className='rounded border border-dotted px-3 py-4'>
            <div className='text-sm'>Giá Ban Đầu:</div>
            <div className='my-3 font-helvetica text-xl font-semibold text-[#555]'>
              {formatCurrency(product.old_price)}₫
            </div>
            <div className='bg-price_linear-gradient rounded-[5px] px-3 py-4 text-white'>
              <div className='text-sm'>Giá ưu đãi đặc biệt:</div>
              <div className='mt-3 flex items-end justify-between'>
                <div className='font-helvetica text-[22px] font-semibold'>{formatCurrency(product.new_price)}₫</div>
                <div className='font-helvetica text-sm'>
                  Tiết kiệm: {formatCurrency(product.old_price - product.new_price)}₫
                </div>
              </div>
            </div>
            <div className='mt-3 flex gap-2'>
              <span className='bg-[#f5f5f5] p-1 text-xs'>Giá đã có VAT</span>
              <span className='bg-[#f5f5f5] p-1 text-xs'>{product.guarantee}</span>
            </div>
          </div>
          {/* Gift */}
          <div className='mt-3 rounded border border-[#ccc]'>
            <div className='flex items-center justify-start gap-2 rounded-t bg-[#f1f1f1] px-3 py-2 text-sm font-semibold text-red-500'>
              <GiftIcon className='h-4 w-4' stroke_width={2.5} />
              Quà tặng và ưu đãi kèm theo
            </div>
            <div className='px-3 py-4'>
              <div className='text-base font-semibold uppercase text-red-500'>Khuyến mại tặng bảo hành</div>
              <div className='mt-2 h-[1px] w-[80px] border border-b-0 border-[#ddd]'></div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>1</div>
                Ưu đãi tặng thêm 06 tháng BẢO HÀNH tại HACOM áp dụng từ 04.04-30.06.24
              </div>
              <div className='mt-4 text-base font-semibold uppercase text-red-500'>Ưu đãi hấp dẫn mua kèm laptop</div>
              <div className='mt-2 h-[1px] w-[80px] border border-b-0 border-[#ddd]'></div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>1</div>
                Giảm ngay 50.000đ khi mua Balo, Cặp, Túi chống sốc cao cấp thương hiệu WIWU
              </div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>2</div>
                Giảm ngay 100.000đ khi mua Ram Laptop thương hiệu KINGSTON
              </div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>3</div>
                Giảm ngay 100.000đ khi mua Ram Laptop thương hiệu LEXAR
              </div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>4</div>
                Giảm ngay 200.000đ khi mua Ghế công thái học thương hiệu LEGION
              </div>
              <div className='mt-2 flex gap-2 leading-5'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>5</div>
                Giảm ngay 300.000đ khi mua Ghế công thái học thương hiệu HBADA
              </div>
              <div className='mt-4 text-base font-semibold uppercase text-red-500'>Khuyến mại khác</div>
              <div className='mt-2 h-[1px] w-[80px] border border-b-0 border-[#ddd]'></div>
              <div className='mt-2 flex gap-2 text-sm font-bold leading-5 text-red-500'>
                <PhoneIcon className='h-7 w-7 text-[#243a76]' fill='#243a76' />
                Cam kết giá tốt nhất thị trường, liên hệ 19001903 hoặc đến tận nơi để có giá tốt nhất!
              </div>
            </div>
          </div>
          {/* Order Quantity */}
          <div className='mt-5 flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='text-[13px] font-semibold'>Số lượng:</span>
              <div className='ml-3 flex items-center'>
                <button
                  className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
                  onClick={() => {
                    if (orderQuantity > 1) {
                      setOrderQuantity((prev) => prev - 1)
                    }
                  }}
                >
                  -
                </button>
                <input
                  type='text'
                  value={orderQuantity}
                  className='block h-8 w-12 border border-[#dfdfdf] text-center font-semibold'
                  onChange={(e) => setOrderQuantity(Number(e.target.value))}
                />
                <button
                  className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
                  onClick={() => {
                    setOrderQuantity((prev) => prev + 1)
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={showrooms.length === 0}
              onClick={handleAddToCart}
              className={classNames(
                'bg-price_linear-gradient flex items-center gap-1 rounded border border-[#ddd] px-[15px] py-[8px] text-[13px] font-semibold text-white',
                {
                  'cursor-not-allowed opacity-80': showrooms.length === 0,
                  'cursor-pointer': showrooms.length > 0
                }
              )}
            >
              <ShoppingCartIcon className='h-5 w-5' />
              Thêm vào giỏ hàng
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            className={classNames('mt-4 w-full rounded bg-[#ed1b24] py-4 text-white', {
              'cursor-not-allowed opacity-80': showrooms.length === 0 || !profile,
              'cursor-pointer': showrooms.length > 0 && profile
            })}
            disabled={showrooms.length === 0}
          >
            <div className='text-base font-semibold uppercase'>Đặt mua ngay</div>
            <div>Giao nhanh tận nơi, miễn phí toàn quốc</div>
          </button>
        </div>
        <div className='col-span-2 ml-3'>
          <div>
            <div className='rounded-t bg-[#ed1b24] py-2 text-center text-sm font-semibold text-white'>
              Có {showrooms.length} cửa hàng có sẵn sản phẩm này
            </div>
            <div className='rounded-b border border-t-0 border-[#ccc]'>
              {/* Filter */}
              <div className='flex gap-2 p-2'>
                <select name='' id='' className='w-1/2 border p-1 text-sm outline-none' onChange={handleFilterShowroom}>
                  <option value='All'>Tỉnh/Thành</option>
                  <option value='Hà Nội'>Hà Nội</option>
                  <option value='Hải Phòng'>Hải Phòng</option>
                  <option value='Bắc Ninh'>Bắc Ninh</option>
                  <option value='Thanh Hóa'>Thanh Hóa</option>
                  <option value='Hà Nam'>Hà Nam</option>
                  <option value='Nghệ An'>Nghệ An</option>
                  <option value='Thái Nguyên'>Thái Nguyên</option>
                  <option value='TP. Hồ Chí Minh'>TP. Hồ Chí Minh</option>
                </select>
                <select name='' id='' className='w-1/2 border p-1 text-sm outline-none'>
                  <option value=''>Quận/Huyện</option>
                  <option value=''></option>
                </select>
              </div>
              {/* Showroom has availble product */}
              <div className='max-h-[320px] overflow-y-auto overflow-x-hidden'>
                {showrooms.map((showroom) => (
                  <div
                    key={showroom.address}
                    className='flex items-center gap-1 px-2 text-xs odd:bg-[#f2f2f2] even:bg-white 2xl:text-sm'
                  >
                    <div className='w-3'>
                      <ChevronRightIcon stroke_width={3} />
                    </div>
                    <span className='text-nowrap text-xs leading-8 2xl:text-sm 2xl:leading-9'>{showroom.address}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='rounded-t bg-[#ed1b24] p-2 text-sm font-semibold uppercase text-white'>
              Yên tâm mua hàng
            </div>
            <div className='rounded-b border border-t-0 border-[#ccc]'>
              <ul
                className={
                  'list-inside list-circle overflow-hidden p-1 text-xs leading-[22px] 2xl:text-sm 2xl:leading-8'
                }
              >
                {[
                  'Uy tín 22 năm Top đầu trên thị trường',
                  ' Sản phẩm chính hãng 100%',
                  'Trả góp lãi suất 0% toàn bộ giỏ hàng',
                  'Trả bảo hành tận nơi sử dụng',
                  'Bảo hành tận nơi cho doanh nghiệp',
                  'Vệ sinh miễn phí trọn đời PC, Laptop'
                ].map((item) => (
                  <li key={`${item}`} className='list-item'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='mt-3'>
            <div className='rounded-t bg-[#ed1b24] p-2 text-sm font-semibold uppercase text-white'>
              Miễn phí giao hàng
            </div>
            <div className='rounded-b border border-t-0 border-[#ccc]'>
              <ul
                className={
                  'list-inside list-circle overflow-hidden p-1 text-xs leading-[22px] 2xl:text-sm 2xl:leading-8'
                }
              >
                {['Giao hàng miễn phí toàn quốc', 'Nhận hàng và thanh toán tại nhà (ship COD)'].map((item) => (
                  <li key={`${item}`} className='list-item'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
