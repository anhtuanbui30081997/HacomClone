export const purchaseStatus = {
  inCart: -1,
  all: 0,
  waitForConfirmation: 1,
  waitForGetting: 2,
  inProgress: 3,
  delivered: 4,
  cancelled: 5
} as const

export interface PurchaseType {
  _id: string
  user_id: string
  product_id: string
  buy_count: number
  purchase_status: number
  product_info: {
    name: string
    new_price: number
    old_price: number
    product_code: string
    images: string[]
  }
}
