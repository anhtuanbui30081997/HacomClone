import { InputHTMLAttributes, useState } from 'react'
import { CloseEyeIcon, OpenEyeIcon } from 'src/assets/icons'

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  errorMessage?: string
}

export default function Input({
  className,
  classNameInput,
  classNameError,
  classNameEye,
  errorMessage,
  type,
  placeholder,
  autoComplete = 'on',
  ...rest
}: PropsInput) {
  const [openEye, setOpenEye] = useState<boolean>(false)
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
        autoComplete={autoComplete}
        className={classNameInput}
        type={type === 'password' && openEye ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <span className={classNameError}>{errorMessage}</span>
    </div>
  )
}
