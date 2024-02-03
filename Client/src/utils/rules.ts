import * as yup from 'yup'

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại mật khẩu là yêu cầu bắt buộc')
    .min(8, 'Độ dài password bắt buộc từ 8 - 100 kí tự')
    .max(100, 'Độ dài password bắt buộc từ 8 - 100 kí tự')
    .oneOf([yup.ref(refString)], 'Mật khẩu nhập lại không khớp')
}

export const userSchema = yup.object({
  name: yup.string().required('Tên là yêu cầu bắt buộc'),
  email: yup.string().required('Email là yêu cầu bắt buộc').email('Email không hợp lệ'),
  password: yup
    .string()
    .required('Mật khẩu là yêu cầu bắt buộc')
    .min(8, 'Độ dài password bắt buộc từ 8 - 100 kí tự')
    .max(100, 'Độ dài password bắt buộc từ 8 - 100 kí tự'),
  confirm_password: handleConfirmPassword('password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type LoginFormData = Pick<UserSchema, 'email' | 'password'>
