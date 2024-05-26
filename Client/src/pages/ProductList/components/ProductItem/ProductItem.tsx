import { Link } from 'react-router-dom'
import { ProductType } from 'src/types/product.type'
import product1 from 'src/assets/images/product1.png'
import ProductRating from '../ProductRating'
import { formatCurrency, generateNameId, rateSale } from 'src/utils/utils'
import { PhoneIcon } from 'src/assets/icons'
import Popover from 'src/components/Popover'
import ProductHoverInfo from '../ProductHoverInfo'
import path from 'src/constants/path'
import {useContext} from 'react'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { purchaseStatus } from 'src/types/purchase.type'

const ProductItem = (props: ProductType) => {
  const { profile, setIsOpenLoginDialog } = useContext<AppContextInterface>(AppContext)
  const showrooms = props.showrooms || []
  const queryClient = useQueryClient()
  const addToCartMutation = useMutation({
    mutationFn: () => purchaseApi.addToCart({ buy_count: 1, product_id: props._id as string }),
    onSuccess: (data) => {
      toast.success(data.data.message, { autoClose: 1000 })
      queryClient.invalidateQueries({
        queryKey: ['purchases', purchaseStatus.inCart]
      })
    }
  })
  const handleAddToCart = () => {
    if (profile) {
      // Call API add to cart
      addToCartMutation.mutate()
    } else {
      setIsOpenLoginDialog(true)
    }
  }
  return (
    <div
        className='shadow-custom overflow-hidden rounded-lg bg-white transition-transform duration-100 
        hover:translate-y-[-0.04rem]'
      >
        <Popover
          className='relative w-full pt-[100%]'
          renderPopover={<ProductHoverInfo {...props} />}
          placement='right-end'
        >
        <Link to={`${path.home}${generateNameId({ id: props._id, name: props.name })}`}>
          <img
            src={props.images ? props.images[0] : product1}
            alt=''
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
              </Link>
        </Popover>
        <div className='p-3 text-xs'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <ProductRating rating={props.rating ? props.rating : 0} />
              <span className='ml-1 text-xs'>({props.rating_count ? props.rating_count : 0})</span>
            </div>
            <span className='rounded-sm bg-[#f1f1f1] px-[5px] py-[3px] uppercase xl:text-[10px] 2xl:text-xs'>
              Mã: {props.product_code}
            </span>
          </div>
          <div className='line-clamp-3 pt-[10px] font-semibold text-[#333e48] 2xl:text-sm'>{props.name}</div>
          <ul className='mb-[10px] mt-3 list-inside list-circle pl-1 overflow-hidden leading-[18px] xl:h-[108px] 2xl:h-[204px] 2xl:text-sm'>
            {props.specifications.map((item) => (
              <li key={`${item}`} className='list-item'>
                {item}
              </li>
            ))}
          </ul>
          <div className='flex items-center justify-between'>
            <span className='font-helvetica text-[15px] text-[#666] line-through'>
              {formatCurrency(props.old_price)}₫
            </span>
            <span className='text-red-500'>(Tiết kiệm: {rateSale(props.old_price, props.new_price)} )</span>
          </div>
          <div className='mt-2 font-helvetica text-[22px] font-semibold text-black'>
            {formatCurrency(props.new_price)}₫
          </div>
          {showrooms.length > 0 ? (
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
              <button onClick={handleAddToCart} className='rounded-full bg-red-500 p-1 text-white'>
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
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-1 text-[#0074da] mt-5'>
              <PhoneIcon className='h-4 w-4' fill='#0074da' />
              <span className='text-[13px]'>Đặt hàng</span>
            </div>
          )}
          </div>
      </div>
  )
}

export default ProductItem
