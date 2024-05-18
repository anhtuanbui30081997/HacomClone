import { Link } from "react-router-dom";
import { ChevronRightIcon } from "src/assets/icons";
import path from "src/constants/path";

export default function Cart() {
  return <div className="container mx-auto">
    <div className='mt-8 flex items-center'>
      <Link to={path.home} className='text-sm font-semibold text-[#555]'>
        Trang chủ
      </Link>
      <span className='mx-2'>
        <ChevronRightIcon />
      </span>
      <Link
        to={path.cart}
        className='text-sm font-semibold text-[#243a76]'
      >
        Giỏ hàng của bạn
      </Link>
    </div>
    <div className="font-bold text-xl my-3">Giỏ hàng</div>
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        left
      </div>
      <div className="col-span-3">
        right
      </div>
    </div>
  </div>
}
