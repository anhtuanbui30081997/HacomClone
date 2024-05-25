import { useEffect, useState } from 'react'

export default function QuantityController({
  initOder,
  onChange,
  className = 'flex h-full items-center'
}: {
  initOder?: number
  onChange?: (value: number, enable: boolean) => void
  className?: string
}) {
  const [orderQuantity, setOrderQuantity] = useState<number>(initOder || 1)
  const [enable, setEnable] = useState<boolean>(false)
  useEffect(() => {
    onChange && onChange(orderQuantity, enable)
  }, [orderQuantity])
  return (
    <div className={className}>
      <button
        className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
        onClick={() => {
          if (orderQuantity > 1) {
            setOrderQuantity((prev) => prev - 1)
            setEnable(true)
          }
        }}
      >
        -
      </button>
      <input
        type='text'
        value={orderQuantity}
        className='block h-8 w-12 border border-[#dfdfdf] text-center font-semibold'
        onChange={(e) => {
          setOrderQuantity(Number(e.target.value))
          setEnable(true)
        }}
      />
      <button
        className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
        onClick={() => {
          setOrderQuantity((prev) => prev + 1)
          setEnable(true)
        }}
      >
        +
      </button>
    </div>
  )
}
