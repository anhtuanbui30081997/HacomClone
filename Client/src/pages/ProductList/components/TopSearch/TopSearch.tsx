import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import { CartIcon, SearchIcon, SettingIcon, TruckIcon } from 'src/assets/icons'
import logo from 'src/assets/images/logo-hacom-since-2001.png'
import path from 'src/constants/path'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { purchaseStatus } from 'src/types/purchase.type'

export default function TopSearch() {
  const {profile, cartNumber}  = useContext<AppContextInterface>(AppContext)

  const { data: dataPurchasesList } = useQuery({
    queryKey: ['purchases', purchaseStatus.inCart, profile, cartNumber],
    queryFn: () => purchaseApi.getPurchase(purchaseStatus.inCart),
    staleTime: 3 * 60 * 1000,
    enabled: !!profile
  })
  const numberProduct:string = dataPurchasesList?.data.data.length.toString() || '0'

  return (
    <div className='container mx-auto my-5 grid grid-cols-12 items-center'>
      <Link className='col-span-2' to={path.home}>
        <div className='w-1/2'>
          <img src={logo} alt='logo-hacom' className='w-full object-cover'/>
        </div>
      </Link>
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
              <div className='flex items-center gap-1 relative'>
              <span className={classNames('text-[9px] absolute top-[3px] left-[23px] text-white', {
                "left-[26px]": numberProduct.length === 1 ,
                "left-[23px]": numberProduct.length > 1
              })}>{numberProduct}</span>
                <CartIcon />
                <span className='text-xs text-[#333e48]'>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
