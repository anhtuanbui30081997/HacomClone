import { ObjectId } from 'mongodb'

export type PurchaseStatusType = -1 | 0 | 1 | 2 | 3 | 4 | 5

interface PurchaseType {
  _id?: ObjectId
  product_id: ObjectId
  buy_count: number
  purchase_status: PurchaseStatusType
}

export class Purchase {
  _id?: ObjectId
  product_id: ObjectId
  buy_count: number
  purchase_status: PurchaseStatusType
  constructor(purchase: PurchaseType) {
    this._id = purchase._id || new ObjectId()
    this.buy_count = purchase.buy_count
    this.product_id = purchase.product_id
    this.purchase_status = purchase.purchase_status
  }
}
