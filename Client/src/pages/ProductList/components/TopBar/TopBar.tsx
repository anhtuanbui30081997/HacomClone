import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import showroomApi from 'src/apis/showroom.api'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { SortType } from 'src/types/product.type'
import { CodeShowroom } from 'src/types/showroom.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function TopBar({ pageSize, queryConfig }: Props) {
  const navigate = useNavigate()
  const [sort, setSort] = useState<SortType | null>(null)
  const [statusStock, setStatusStock] = useState<'all' | 'stocking' | null>('all')
  const [stockId, setStockId] = useState<string>('all')

  const { data: dataShowrooms } = useQuery({
    queryKey: ['showrooms'],
    queryFn: showroomApi.getAllShowrooms
  })

  const showrooms = dataShowrooms?.data.data

  const handleSortChange = (e: SortType) => {
    setSort(e)
  }
  const handleStatusStockChang = (e: any) => {
    setStatusStock(e)
  }
  const handleStockIdChagne = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setStockId(e.target.value)
    }
  }

  useEffect(() => {
    sort ? (queryConfig.sort = sort) : delete queryConfig.sort
    statusStock ? (queryConfig.other_filter = statusStock) : delete queryConfig.other_filter
    stockId ? (queryConfig.stock = stockId) : delete queryConfig.stock
    navigate({
      pathname: undefined,
      search: createSearchParams(queryConfig).toString()
    })
  }, [sort, statusStock, stockId])

  return (
    <div className='w-full bg-[#f2f2f2] p-3'>
      {/* Filter Top */}
      <div className='flex items-center gap-5'>
        {/* Tình trạng kho hàng */}
        <select
          name=''
          id=''
          className='h-7 w-[180px] rounded-sm border pl-1 text-sm outline-none'
          onChange={(e) => handleStatusStockChang(e.target.value)}
        >
          <option value='all' className='text text-[13px]'>
            Tình trạng kho hàng
          </option>
          <option value='stocking'>Còn hàng</option>
        </select>
        {/* Kho */}
        <select
          name=''
          id=''
          className='h-7 w-[302px] rounded-sm border pl-1 text-[13px] outline-none'
          onChange={handleStockIdChagne}
        >
          <option value={'all'} className='text-[13px]'>
            Tất cả kho
          </option>
          {showrooms &&
            showrooms.map((showroom) => (
              <option key={showroom._id} value={showroom.code_showroom}>
                {showroom.address}
              </option>
            ))}
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
          <button
            onClick={() => handleSortChange('new')}
            className='rounded-sm border border-dashed border-[#243a76] 
        px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
          >
            Hàng mới
          </button>
          <button
            onClick={() => handleSortChange('views')}
            className='rounded-sm border border-dashed border-[#243a76] 
        px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
          >
            Xem nhiều
          </button>
          <button
            onClick={() => handleSortChange('price_off')}
            className='rounded-sm border border-dashed border-[#243a76] 
        px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
          >
            Giá giảm nhiều
          </button>
          <button
            onClick={() => handleSortChange('price_inc')}
            className='rounded-sm border border-dashed border-[#243a76] 
        px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
          >
            Giá tăng dần
          </button>
          <button
            onClick={() => handleSortChange('price_dec')}
            className='rounded-sm border border-dashed border-[#243a76] 
        px-[10px] py-[5px] font-semibold capitalize text-[#243a76] hover:bg-[#243a76] hover:text-white xl:text-xs 2xl:text-sm'
          >
            Giá Giảm dần
          </button>
        </div>
        <div>
          <select
            name=''
            id=''
            className='h-7 w-[130px] rounded-sm border pl-1 text-sm outline-none'
            onChange={(e) => handleSortChange(e.target.value as SortType)}
          >
            <option value='' className='text text-[13px]'>
              Lọc sản phẩm
            </option>
            <option value={'rating'}>Đánh giá</option>
            <option value={'name'}>Tên từ a - z</option>
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
  )
}
