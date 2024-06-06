import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import { CartIcon, SearchIcon, SettingIcon, TruckIcon } from 'src/assets/icons'
import logo from 'src/assets/images/logo-hacom-since-2001.png'
import path from 'src/constants/path'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { purchaseStatus } from 'src/types/purchase.type'
import { debounce } from 'lodash'
import productApi, { SearchProductType } from 'src/apis/product.api'
import { toast } from 'react-toastify'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useLocation } from 'react-router-dom'

export default function TopSearch() {
  const { isAuthenticated } = useContext<AppContextInterface>(AppContext)
  const [searchProducts, setSearchProducts] = useState<SearchProductType[] | null>(null)
  let location = useLocation()
  const { onSubmitSearch, register, reset } = useSearchProducts()
  const { data: dataPurchasesList } = useQuery({
    queryKey: ['purchases', purchaseStatus.inCart],
    queryFn: () => purchaseApi.getPurchase(purchaseStatus.inCart),
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })
  const numberProduct: string = dataPurchasesList?.data.data.length.toString() || '0'
  const getSearchProductsMutaion = useMutation({
    mutationFn: (name: string) => productApi.searchProduct(name),
    onSuccess: (data) => {
      setSearchProducts(data.data.data)
      toast.success(data.data.message)
    }
  })

  useEffect(() => {
    setSearchProducts(null)
    reset()
  }, [location])

  return (
    <div className='container mx-auto my-5 grid grid-cols-4 items-center'>
      <Link className='col-span-1' to={path.home}>
        <div className='w-[35%]'>
          <img src={logo} alt='logo-hacom' className='w-full object-cover' />
        </div>
      </Link>
      <div className='col-span-3'>
        <div className='grid grid-cols-4 items-center'>
          <div className='relative col-span-2'>
            <form className='flex xl:h-8 2xl:h-10' onSubmit={onSubmitSearch}>
              <input
                type='text'
                className='grow rounded-l-full border-2 border-red-500 px-5 py-1 text-xs text-[#000] outline-none'
                placeholder='Nhập tên sản phẩm, từ khóa cần tìm'
                {...register('name')}
                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value) {
                    console.log(e.target.value)
                    getSearchProductsMutaion.mutate(e.target.value)
                  } else {
                    setSearchProducts(null)
                  }
                }, 1000)}
              />
              <button className='rounded-r-full bg-red-500 px-5 py-1 text-white'>
                <SearchIcon className='h-4 w-4' />
              </button>
            </form>
            {searchProducts && (
              <div className='absolute z-[999] max-h-[500px] w-full overflow-auto rounded border border-[#ddd] bg-white text-[13px] shadow-sm xl:top-9 2xl:top-11'>
                {searchProducts.map((product) => (
                  <Link key={product._id} to={`${path.home}${generateNameId({ id: product._id, name: product.name })}`}>
                    <div className='flex items-center gap-1 p-[10px]'>
                      <div className='h-[60px] w-[60px] shrink-0'>
                        <img className='h-full w-full object-cover' src={product.images[0]} alt='' />
                      </div>
                      <div className='flex flex-col'>
                        <span>{product.name}</span>
                        <span className='font-helvetica text-red-500'>{formatCurrency(product.new_price)} ₫</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className='col-span-2'>
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
              <Link to={path.cart} className='relative flex items-center gap-1'>
                <span
                  className={classNames('absolute left-[23px] top-[3px] text-[9px] text-white', {
                    'left-[26px]': numberProduct.length === 1,
                    'left-[23px]': numberProduct.length > 1
                  })}
                >
                  {numberProduct}
                </span>
                <CartIcon />
                <span className='text-xs text-[#333e48]'>Giỏ hàng</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
