import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function TopBar({ pageSize, queryConfig }: Props) {
  console.log(pageSize)
  return (
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
  )
}
