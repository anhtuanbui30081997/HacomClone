import { useEffect, useState } from 'react'

export default function QuantityController({
  initOder,
  onChange,
  className = 'flex h-full items-center'
}: {
  initOder?: number
  onChange?: (value: number) => void
  className?: string
}) {
  const [orderQuantity, setOrderQuantity] = useState<number>(initOder || 1)
  useEffect(() => {
    onChange && onChange(orderQuantity)
  }, [orderQuantity])
  return (
    <div className={className}>
      <button
        className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
        onClick={() => {
          if (orderQuantity > 1) {
            setOrderQuantity((prev) => prev - 1)
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
        }}
      />
      <button
        className='h-8 w-8 border border-[#dfdfdf] text-[19px] font-semibold leading-[27px]'
        onClick={() => {
          setOrderQuantity((prev) => prev + 1)
        }}
      >
        +
      </button>
    </div>
  )
}
