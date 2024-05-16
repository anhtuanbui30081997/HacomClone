import { Link } from 'react-router-dom'
import { CheckCircle, GiftIcon, Square3Stack } from 'src/assets/icons'
import { ProductType } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'

export default function ProductHoverInfo(props: ProductType) {
  return (
    <div className='w-[390px] rounded-lg border border-[#243a76] bg-white shadow-md'>
      <div className='bg-header-linear w-full rounded-t-lg px-[15px] py-[10px] text-[15px] font-semibold leading-5 text-white'>
        <Link to={'/'}>{props.name}</Link>
      </div>
      <table className='mt-2'>
        <tbody className='text-[13px]'>
          <tr>
            <td className='text-[#333e48]'>- Giá bán:</td>
            <td>
              <span className='font-semibold text-black'>{formatCurrency(props.old_price)}₫</span>
            </td>
          </tr>
          <tr>
            <td className='text-[#333e48]'>- Giá HACOM:</td>
            <td>
              <span className='mr-1 font-bold text-red-500'>{formatCurrency(props.new_price)}₫</span>
              <span>[Đã bao gồm VAT]</span>
            </td>
          </tr>
          <tr>
            <td className='text-[#333e48]'>- Bảo hành:</td>
            <td>{props.guarantee}</td>
          </tr>
          <tr>
            <td className='text-[#333e48]'>- Kho hàng:</td>
            <td>
              <ul>
                {props.showrooms &&
                  props.showrooms.map((showroom) => (
                    <li className='flex items-center gap-1 text-xs font-semibold text-red-500'>
                      <CheckCircle className='h-[14px] w-[14px] text-green-600' />
                      <span>{showroom.address}</span>
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='mt-2'>
        <div className='ml-2 flex w-fit items-center gap-1 rounded-[3px] bg-[#243a76] px-[12px] py-[5px] text-xs text-white'>
          <Square3Stack className='h-4 w-4' />
          <span>Thông số sản phẩm</span>
        </div>
        <ul className='my-1 list-inside list-disc pl-2 text-xs'>
          {props.specifications &&
            props.specifications.map((item) => (
              <li key={item} className='leading-5'>
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className='my-2'>
        <div className='ml-2 flex w-fit items-center gap-1 rounded-[3px] bg-[#243a76] px-[12px] py-[5px] text-xs text-white'>
          <GiftIcon className='h-4 w-4' />
          <span>Chương trình khuyên mại</span>
        </div>
      </div>
    </div>
  )
}
