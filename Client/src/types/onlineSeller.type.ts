export type SellerType = 0 | 1
export interface OnlineSellerType {
  _id?: string
  name: string
  phone_number: string
  email: string
  seller_type: SellerType
}
