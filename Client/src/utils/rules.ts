import * as yup from 'yup'

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại mật khẩu là yêu cầu bắt buộc')
    .min(8, 'Độ dài password bắt buộc từ 8 - 100 kí tự')
    .max(100, 'Độ dài password bắt buộc từ 8 - 100 kí tự')
    .oneOf([yup.ref(refString)], 'Mật khẩu nhập lại không khớp')
}

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
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

export const priceSchema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export type UserSchema = yup.InferType<typeof userSchema>
export type LoginFormData = Pick<UserSchema, 'email' | 'password'>
export type PriceSchema = yup.InferType<typeof priceSchema>
