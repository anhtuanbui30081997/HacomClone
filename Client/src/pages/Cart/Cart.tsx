import { Link } from 'react-router-dom'
import { ChevronRightIcon, GiftIcon, TrashIcon } from 'src/assets/icons'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import QuantityController from 'src/components/QuantityController'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PurchaseType, purchaseStatus } from 'src/types/purchase.type'
import purchaseApi from 'src/apis/purchase.api'
import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextInterface } from 'src/contexts/app.context'
import { keyBy } from 'lodash'
import { formatCurrency } from 'src/utils/utils'
import { produce } from 'immer'
import { toast } from 'react-toastify'

interface ExtendedPurchase extends PurchaseType {
  checked: boolean
  disable: boolean
}

export default function Cart() {
  const { isAuthenticated } = useContext<AppContextInterface>(AppContext)
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false)
  const [tempPrice, setTempPrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', purchaseStatus.inCart],
    queryFn: () => purchaseApi.getPurchase(purchaseStatus.inCart),
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })
  const purchasesInCart = purchasesInCartData?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      toast.success("Update purchase successfully")
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      toast.success("Delete purchase successfully")
    }
  })
  const deleteAllPurchaseMutation = useMutation({
    mutationFn: purchaseApi.deleteAllPurchase,
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  const handleCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(e.target.checked)
    setExtendedPurchases(
      produce((draft) => {
        draft.forEach((item) => item.checked = e.target.checked)
      })
    )
  }

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, purchaseIndex: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
    const remainingPurchase = extendedPurchases.filter((purchase, index) => index != purchaseIndex)
    const checkedAll = remainingPurchase.reduce((checked, purchase)=> {
      return checked && purchase.checked
    }, true) && e.target.checked
    setIsCheckedAll(checkedAll)
  }

  const calculateTotalPrice = () => {
    const checkedList = extendedPurchases.filter(purchase => purchase.checked === true)
    const tempPrice = checkedList.reduce((sum, purchase) => {
      return sum + (purchase.buy_count * purchase.product_info.new_price)
    }, 0)
    return tempPrice
  }

  useEffect(() => {
    const tempPrice = calculateTotalPrice()
    setTempPrice(tempPrice)
  }, [extendedPurchases])

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          return {
            ...purchase,
            disable: false,
            checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart])

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disable = enable
          draft[purchaseIndex].buy_count = value
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product_id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => {
    const purchase = extendedPurchases[purchaseIndex]
    setExtendedPurchases(
      produce((draft) => draft.filter(item => item.product_id !== purchase.product_id))
    )
    deletePurchaseMutation.mutate(purchase.product_id)
    refetch()
  }

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
                <input type='checkbox' className='accent-orange h-5 w-5' checked={isCheckedAll} onChange={handleCheckedAllChange} />
                <div className='flex-grow'>Tất cả sản phẩm ({extendedPurchases.length} sản phẩm)</div>
              </div>
            </div>
            <div className='col-span-2'>Đơn giá</div>
            <div className='col-span-2 pl-[15px]'>Số lượng</div>
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
                  <button onClick={() => {
                    deleteAllPurchaseMutation.mutate()
                    refetch()
                  }}>
                    <TrashIcon className='h-5 w-5 text-[#999]' />
                  </button>
                </Popover>
              </div>
            </div>
          </div>
          {extendedPurchases.length > 0 &&
            extendedPurchases.map((purchase, index) => {
              return (
                <div key={purchase._id} className='mt-[10px] grid grid-cols-11 rounded-sm p-[15px] text-start text-sm shadow-sm'>
                  <div className='col-span-5'>
                    <div className='flex items-center gap-[10px]'>
                      <div>
                        <input type='checkbox' className='accent-orange h-5 w-5' checked={purchase.checked} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheckedChange(e, index)}/>
                      </div>
                      <Link to={'/'} className='h-[90px] w-[90px] flex-shrink-0'>
                        <img src={purchase.product_info.images[0]} alt='' className='h-full w-full object-cover' />
                      </Link>
                      <div className='pr-[15px]'>
                        <Link to={'/'} className='mb-[10px] block w-full break-all text-sm'>
                          {purchase.product_info.name}
                        </Link>
                        {purchase.product_info.new_price >= 10000000 && purchase.product_info.new_price <= 20000000 && (
                          <fieldset className='mb-[10px] border border-[#ccc] p-[5px] text-[13px]'>
                            <legend>Dịch vụ mua kèm (tùy chọn)</legend>
                            <label>
                              <input type='checkbox' name='mycheckbox' className=' mr-1' />
                              Gói Bảo Hành Mở Rộng 12 Tháng Tại Hacom Cho Laptop Từ 10 Triệu Đến Dưới 20 Triệu (799.000
                              ₫)
                            </label>
                          </fieldset>
                        )}
                        <div className='text-[12px]'>{purchase.product_info.product_code}</div>
                        <div className='mt-[10px] flex w-fit items-center gap-1 border border-[#d8d8d8] p-[5px] text-sm'>
                          <GiftIcon className='h-4 w-4' />
                          <span>Khuyến mại</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex h-full items-center justify-start'>
                      <div className='flex items-center gap-2'>
                        <span className='font-helvetica text-base font-semibold text-black'>
                          {formatCurrency(purchase.product_info.new_price)}₫
                        </span>
                        <span className='font-helvetica text-xs text-[#888] line-through'>
                          {formatCurrency(purchase.product_info.old_price)}0₫
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 pl-[15px]'>
                    <QuantityController
                      onChange={(value: number, enable: boolean) => {
                        handleQuantity(index, value, enable)
                      }}
                      initOder={purchase.buy_count}
                    />
                  </div>
                  <div className='col-span-2'>
                    <div className='flex h-full items-center justify-between'>
                      <span className='font-helvetica text-base font-semibold text-[#ee2724]'>
                        {formatCurrency(purchase.buy_count * purchase.product_info.new_price)}₫
                      </span>
                      <Popover
                        className='relative px-5'
                        renderPopover={
                          <div className='absolute left-0 top-0 w-[160px] rounded-md bg-black px-2 py-1 text-center text-sm text-white'>
                            Xóa khỏi giỏ hàng
                          </div>
                        }
                        placement='bottom-start'
                      >
                        <button onClick={() => handleDeletePurchase(index)}>
                          <TrashIcon className='h-5 w-5 text-[#999]' />
                        </button>
                      </Popover>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className='relative col-span-3'>
          <div className='sticky top-10 flex w-full flex-col gap-2'>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Mã giảm giá / quà tặng'
                className='h-9 flex-grow rounded-l-[3px] border border-[#243a76] px-[10px] text-xs outline-none placeholder:text-xs'
              />
              <button className='h-9 w-[75px] rounded-r-[3px] border border-[#243a76] bg-[#243a76] text-[13px] font-medium text-white'>
                Áp dụng
              </button>
            </div>
            <div className='flex justify-between border-b border-[#e1e1e1] p-[10px] text-sm'>
              <span>Tạm tính</span>
              <span className='font-helvetica font-semibold'>{formatCurrency(tempPrice)}₫</span>
            </div>
            <div className='flex justify-between border-b border-[#e1e1e1] p-[10px] text-sm'>
              <span>Giảm giá</span>
              <span className='font-helvetica font-semibold'>{formatCurrency(discount)}₫</span>
            </div>
            <div className='flex justify-between p-[10px] text-sm'>
              <span>Thành tiền</span>
              <span className='font-helvetica text-base font-semibold text-[#ee2724]'>{formatCurrency(tempPrice - discount)}₫</span>
            </div>
            <div className='text-end text-sm'>(Đã bao gồm VAT nếu có)</div>
            <button className='h-10 rounded bg-[#243a76] text-sm font-medium text-white'>Tiến hành đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  )
}
