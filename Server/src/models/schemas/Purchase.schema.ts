import { ObjectId } from 'mongodb'

interface PurchaseType {
  _id?: ObjectId
  name: string
  specifications: string[]
  rating?: number
  comments?: number
  views?: number
  old_price: string
  new_price: string
  images?: string[]
  guarantee: string
  categories: number[]
  showrooms: string[]
}

export class Purchase {
  _id?: ObjectId
  name: string
  specifications: string[]
  rating?: number
  comments?: number
  views?: number
  old_price: string
  new_price: string
  images?: string[]
  guarantee: string
  categories: number[]
  showrooms: string[]
  constructor(purchase: PurchaseType) {
    this._id = purchase._id || new ObjectId()
    this.name = purchase.name
    this.specifications = purchase.specifications
    this.old_price = purchase.old_price
    this.new_price = purchase.new_price
    this.guarantee = purchase.guarantee
    this.categories = purchase.categories
    this.showrooms = purchase.showrooms
  }
}
