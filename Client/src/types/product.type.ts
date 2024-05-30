import { CategoryType } from 'src/constants/category.enum'
import { CodeShowroom } from './showroom.type'

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
  | 'amdRyzen7'
  | 'appleM1'
  | 'appleM2'
  | 'appleM3'
export type Ram = '4GB' | '8GB' | '16GB' | '32GB' | '>32GB'
export type Vga = 'vgaNvidia' | 'vgaAmd' | 'vagTichHop' | 'rtx2050/2050ti' | 'rtx4050' | 'rtx3050/3050ti' | 'rxt4060'
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

export interface ProductType {
  _id: string
  name: string
  product_code: string
  specifications: string[]
  rating?: number
  rating_count?: number
  comments?: number
  views?: number
  old_price: number
  new_price: number
  price_off: number
  images: string[]
  guarantee: string
  categories: number[]
  showrooms?: {
    code_showroom: number
    address: string
    quantity: number
  }[]
}

export interface ProductList {
  products: ProductType[]
  page: number
  limit: number
  total: number
  page_size: number
}

export type SortType = 'new' | 'views' | 'price_off' | 'price_inc' | 'price_dec' | 'rating' | 'name'

export interface ProductListConfig {
  name?: string
  page?: number | string
  limit?: number | string
  category?: CategoryType
  brand?: Brand
  style?: Style
  color?: Color
  cpu?: Cpu
  ram?: Ram
  vga?: Vga
  laptop_category?: LaptopCategory
  operation_system?: OperationSystem
  screen_frequency?: ScreenFrequency
  screen_resolution?: ScreenResolution
  size_screen?: SizeScreen
  touch_screen?: TouchScreen
  sort?: SortType
  stock?: CodeShowroom
  price_max?: number | string
  price_min?: number | string
  other_filter?: 'stocking' | 'all'
}

export interface Quantity {
  brand: {
    asus: number
    acer: number
    dell: number
    hp: number
    lenovo: number
    msi: number
    macbook: number
    lg: number
    microsoft: number
    vaio: number
  }
  style: {
    fashion: number
    gaming: number
    technology: number
    common: number
  }
  color: {
    black: number
    gray: number
    sliver: number
    white: number
    pink: number
    gold: number
    blue: number
  }
  laptopCategory: {
    laptopGaming: number
    doHoaKienTruc: number
    phoThongVanPhong: number
    mongNheThoiTrang: number
    doanhNhan: number
  }
  cpu: {
    intelCeleronPentium: number
    intelCorei3: number
    intelCorei5: number
    intelCorei7: number
    intelCorei9: number
    amdRyzen3: number
    amdRyzen5: number
    amdRyzen7: number
    appleM1: number
    appleM2: number
    appleM3: number
  }
  ram: {
    ram_4GB: number
    ram_8GB: number
    ram_16GB: number
    ram_32GB: number
    ram_gt_32GB: number
  }
  vga: {
    vgaNvidia: number
    vgaAmd: number
    vagTichHop: number
    rtx2050_2050ti: number
    rtx4050: number
    rtx3050_3050ti: number
    rxt4060: number
  }
  screenSize: {
    s_13_3inch: number
    s_13inch: number
    s_13_5inch: number
    s_13_6inch: number
    s_13_4inch: number
    s_15_4inch: number
    s_14inch: number
    s_14_2inch: number
    s_15inch: number
    s_14_5inch: number
    s_15_6inch: number
    s_16inch: number
    s_16_2inch: number
    s_17inch: number
    s_15_3inch: number
    s_other: number
  }
  screenResolution: {
    r_HD_1366x768: number
    r_Full_HD_1920x1080: number
    r_WUXGA_1920x1200: number
    r_WQHD_2560x1440: number
    r_WQXGA_2560x1600: number
    r_Pixel_Sense_2736x1824: number
    r_2_8K_2880x1800: number
    r_Retina_2560x1600: number
    r_Retina_2560x1664: number
    r_4K_3840x2160: number
    r_3k_3200x2000: number
    r_Retina_2880x1864: number
    r_other: number
  }
  operationSystem: {
    os_windows: number
    os_linux: number
    os_dos: number
    os_macos: number
    os_ubuntu: number
  }
  touchScreen: {
    t_yes: number
    t_no: number
  }
  screenFrequency: {
    f_60Hz: number
    f_90Hz: number
    f_120Hz: number
    f_165Hz: number
  }
}
