import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: any): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

export function toSlug(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase()

  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd')

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '')

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-')

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-')

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '')

  // return
  return str
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}
