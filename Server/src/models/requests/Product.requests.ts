import { Query } from 'express-serve-static-core'

export type Brand = 'asus' | 'acer' | 'dell' | 'hp' | 'lenovo' | 'msi' | 'macbook' | 'lg' | 'microsoft' | 'vaio'
export type Style = 'fashion' | 'gaming' | 'technology' | 'common'
export type Color = 'black' | 'gray' | 'sliver' | 'white' | 'pink' | 'gold' | 'blue'
export type LaptopCategory = 'laptopGaming' | 'doHoaKienTruc' | 'phoThongVanPhong' | 'mongNheThoiTrang' | 'doanhNhan'
export type Cpu =
  | 'intelCeleronPentium'
  | 'intelCorei3'
  | 'intelCorei5'
  | 'intelCorei7'
  | 'intelCorei9'
  | 'amdRyzen3'
  | 'amdRyzen5'
  | 'madRyzen7'
  | 'appleM1'
  | 'appleM2'
  | 'appleM3'
export type Ram = '4GB' | '8GB' | '16GB' | '32GB' | '>32GB'
export type Vga = 'vgaNvidia' | 'vgaAmd' | ' vagTichHop' | 'rtx2050/2050ti' | 'rtx4050' | 'rtx3050/3050ti' | 'rxt4060'
export type SizeScreen =
  | '13.3inch'
  | '13inch'
  | '13.5inch'
  | '13.6inch'
  | '13.4inch'
  | '15.4inch'
  | '14inch'
  | '14.2inch'
  | '15inch'
  | '14.5inch'
  | '15.6inch'
  | '16inch'
  | '16.2inch'
  | '17inch'
  | '15.3inch'
  | 'other'
export type ScreenResolution =
  | 'HD (1366x768)'
  | 'Full HD (1920x1080)'
  | 'WUXGA (1920 x 1200)'
  | 'WQHD (2560x1440)'
  | 'WQXGA (2560x1600)'
  | 'Pixel Sense (2736 x 1824)'
  | '2.8K (2880x1800)'
  | 'Retina (2560 x 1600)'
  | 'Retina (2560 x 1664)'
  | '4K (3840x2160)'
  | '3k (3200 x 2000)'
  | 'Retina (2880x1864)'
  | 'other'
export type TouchScreen = 'yes' | 'no'
export type ScreenFrequency = '60Hz' | '90Hz' | '120Hz' | '165Hz'
export type OperationSystem = 'Windows' | 'Linux' | 'Dos' | 'MacOS' | 'Ubuntu'

export interface ProductRequestBody {
  name: string
  specifications: string[]
  product_code: string
  rating?: number
  comments?: number
  views?: number
  old_price: string
  new_price: string
  images: string[]
  guarantee: string
  categories: number[]
  showrooms: string[]
}

export interface PanigationQuery extends Query {
  limit: string
  page: string
}

export interface GetProductListQuery extends PanigationQuery {
  category?: string
  brand?: Brand
  style?: Style
  color?: Color
  laptop_category?: LaptopCategory
  cpu?: Cpu
  size_screen?: SizeScreen
  screen_resolution?: ScreenResolution
  touch_screen?: TouchScreen
  screen_frequency?: ScreenFrequency
  operation_system?: OperationSystem
}
