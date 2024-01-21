import React from 'react'
import { LoadingIcon } from 'src/assets/icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button({ type, className, children, isLoading, disabled, ...rest }: ButtonProps) {
  const newClassName = disabled ? className + ' ' + 'cursor-not-allowed bg-[#eb7b7b]' : className + ' bg-[#ed1b24]'
  return (
    <button disabled={disabled} type={type} className={newClassName} {...rest}>
      {isLoading && <LoadingIcon className='mr-3 inline h-4 w-4 animate-spin fill-white text-white' />}
      {children}
    </button>
  )
}
