export interface PurchaseRequestBody {
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
