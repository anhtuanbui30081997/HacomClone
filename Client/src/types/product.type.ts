export type Brand = 'asus' | 'acer' | 'dell' | 'hp' | 'lenovo' | 'msi' | 'macbook' | 'lg' | 'microsoft' | 'vaio'
export type Style = 'fashion' | 'gaming' | 'technology' | 'common'
export type Sex = 'male' | 'female'
export type Color = 'black' | 'gray' | 'sliver' | 'white' | 'pink' | 'yellow' | 'blue'
export type LaptopCategory = 'laptopGaming' | 'doHoaKienTruc' | 'phoThongVanPhong' | 'mongNheThoiTrang' | 'doanhNhan'
export type Cpu = 'intelCeleronPentium' | 'intelCorei3' | 'intelCorei5' | 'intelCorei7' | 'intelCorei9'
export interface ProductType {
  _id?: string
  name: string
  product_code: string
  specifications: string[]
  rating?: number
  rating_count?: number
  comments?: number
  views?: number
  old_price: string
  new_price: string
  images?: string[]
  guarantee: string
  categories: number[]
  showrooms?: string[]
}
