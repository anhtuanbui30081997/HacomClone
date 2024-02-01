import { ObjectId } from 'mongodb'
import { CategoryType } from '~/constants/enums'

interface ICategory {
  _id?: ObjectId
  name: string
  category: CategoryType
  parent_category: CategoryType
}

export class Category {
  _id?: ObjectId
  name: string
  category: CategoryType
  parent_category: CategoryType
  constructor(category: ICategory) {
    this._id = category._id
    this.name = category.name
    this.category = category.category
    this.parent_category = category.parent_category
  }
}
