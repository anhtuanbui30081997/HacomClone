export interface PurchaseType {
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
