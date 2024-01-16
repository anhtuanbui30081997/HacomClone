import { ObjectId } from 'mongodb'
import { SellerType } from '~/constants/enums'

interface OnlineSellerType {
  _id?: ObjectId
  name: string
  email: string
  phone_number: string
  seller_type: SellerType
}

export class OnlineSeller {
  _id?: ObjectId
  name: string
  email: string
  phone_number: string
  seller_type: SellerType
  constructor(onlineSeller: OnlineSellerType) {
    this._id = onlineSeller._id
    this.email = onlineSeller.email
    this.name = onlineSeller.name
    this.phone_number = onlineSeller.phone_number
    this.seller_type = onlineSeller.seller_type
  }
}
