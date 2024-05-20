import { Link } from 'react-router-dom'
import { ChevronRightIcon, GiftIcon, TrashIcon } from 'src/assets/icons'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import noelImg from '../../assets/images/noel.jpg'

export default function Cart() {
  return (
    <div className='container mx-auto mb-28'>
      <div className='mt-8 flex items-center'>
        <Link to={path.home} className='text-sm font-semibold text-[#555]'>
          Trang chủ
        </Link>
        <span className='mx-2'>
          <ChevronRightIcon />
        </span>
        <Link to={path.cart} className='text-sm font-semibold text-[#243a76]'>
          Giỏ hàng của bạn
        </Link>
      </div>
      <div className='my-3 text-xl font-bold'>Giỏ hàng</div>
      <div className='grid grid-cols-12'>
        <div className='col-span-9'>
          <div className='grid grid-cols-11 py-[10px] text-start text-sm'>
            <div className='col-span-5'>
              <div className='flex items-center gap-2'>
                <input type='checkbox' className='accent-orange h-5 w-5' checked={true} />
                <div className='flex-grow'>Tất cả sản phẩm (3 sản phẩm)</div>
              </div>
            </div>
            <div className='col-span-2'>Đơn giá</div>
            <div className='col-span-2'>Số lượng</div>
            <div className='col-span-2'>
              <div className='flex items-center justify-between'>
                <span>Thành tiền</span>
                <Popover
                  className='relative px-5'
                  renderPopover={
                    <div className='absolute left-0 top-0 w-[160px] rounded-md bg-black px-2 py-1 text-center text-sm text-white'>
                      Xóa toàn bộ giỏ hàng
                    </div>
                  }
                  placement='bottom-start'
                >
                  <button>
                    <TrashIcon className='h-5 w-5 text-[#999]' />
                  </button>
                </Popover>
              </div>
            </div>
          </div>
          <div className='mt-[10px] grid grid-cols-11 text-start text-sm'>
            <div className='col-span-5'>
              <div className='flex items-center gap-[10px]'>
                <div>
                  <input type='checkbox' className='accent-orange h-5 w-5' checked={true} />
                </div>
                <Link to={'/'} className='h-[90px] w-[90px] flex-shrink-0'>
                  <img src={noelImg} alt='' className='h-full w-full object-cover' />
                </Link>
                <div className='pr-[10px]'>
                  <Link to={'/'} className='mb-[10px] block w-full break-all text-sm'>
                    Laptop Acer Aspire 7 A715-76-53PJ (NH.QGESV.007) (i5 12450H/16GB RAM/512GB SSD/15.6 inch
                    FHD/Win11/Đen)
                  </Link>
                  <fieldset className='mb-[10px] border border-[#ccc] p-[5px] text-[13px]'>
                    <legend>Dịch vụ mua kèm (tùy chọn)</legend>
                    <label>
                      <input type='checkbox' name='mycheckbox' className=' mr-1' />
                      Gói Bảo Hành Mở Rộng 12 Tháng Tại Hacom Cho Laptop Từ 10 Triệu Đến Dưới 20 Triệu (799.000 ₫)
                    </label>
                  </fieldset>
                  <div className='text-[12px]'>Mã SP: LTAC858</div>
                  <div className='mt-[10px] flex w-fit items-center gap-1 border border-[#d8d8d8] p-[5px] text-sm'>
                    <GiftIcon className='h-4 w-4' />
                    <span>Khuyến mại</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-2'>
              <div className='flex h-full items-center justify-start'>
                <div className='flex items-center gap-1'>
                  <span className='font-helvetica text-base font-semibold text-black'>14.999.000₫</span>
                  <span className='font-helvetica text-xs line-through'>16.999.000₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-3'>right</div>
      </div>
    </div>
  )
}
