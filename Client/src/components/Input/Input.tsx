import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CloseEyeIcon, OpenEyeIcon } from 'src/assets/icons'

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  errorMessage?: string
}

export default function Input({
  register,
  name,
  type,
  placeholder,
  errorMessage,
  autoComplete = 'on',
  className,
  classNameError = 'mt-2 block text-red-500',
  classNameEye = 'w-5 h-5 absolute top-[10px] right-[8px] cursor-pointer select-none',
  classNameInput = 'h-[34px] w-full border-b-[1px] border-slate-300 text-sm font-normal leading-[34px] outline-none',
  ...rest
}: PropsInput) {
  const [openEye, setOpenEye] = useState<boolean>(false)
  const registerResult = register && name ? register(name) : {}

  return (
    <div className={className}>
      {type === 'password' && openEye && (
        <OpenEyeIcon onClick={() => setOpenEye((prev) => !prev)} className={classNameEye} />
      )}
      {type === 'password' && !openEye && (
        <CloseEyeIcon onClick={() => setOpenEye((prev) => !prev)} className={classNameEye} />
      )}
      <input
        {...rest}
        {...registerResult}
        autoComplete={autoComplete}
        className={classNameInput}
        type={type === 'password' && openEye ? 'text' : type}
        placeholder={placeholder}
      />
      <span className={classNameError}>{errorMessage}</span>
    </div>
  )
}
