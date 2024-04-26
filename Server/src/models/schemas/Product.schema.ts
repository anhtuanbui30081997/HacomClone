import { ObjectId } from 'mongodb'

type Group = 'laptop'

interface ProductType {
  _id?: ObjectId
  name: string
  product_code: string
  specifications: string[]
  rating?: number
  number_rating?: number
  comments?: number
  views?: number
  old_price: string
  new_price: string
  images: string[]
  guarantee: string
  categories: number[]
  showrooms: string[]
  group?: Group
}

export class Product {
  _id?: ObjectId
  name: string
  product_code: string
  specifications: string[]
  rating: number
  number_rating: number
  comments?: number
  views: number
  old_price: string
  new_price: string
  images: string[]
  guarantee: string
  categories: number[]
  showrooms: string[]
  group: Group
  constructor(product: ProductType) {
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.specifications = product.specifications
    this.old_price = product.old_price
    this.new_price = product.new_price
    this.guarantee = product.guarantee
    this.categories = product.categories
    this.showrooms = product.showrooms
    this.images = product.images
    this.product_code = product.product_code
    this.rating = product.rating || 0
    this.number_rating = product.number_rating || 0
    this.comments = product.comments || 0
    this.views = product.views || 0
    this.group = product.group || 'laptop'
  }
}
