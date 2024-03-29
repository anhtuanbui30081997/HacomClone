import { ObjectId } from 'mongodb'
import { RoleType } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: RoleType
  created_at?: Date
  updated_at?: Date
}

export class User {
  _id: ObjectId
  name: string
  email: string
  password: string
  role: RoleType
  created_at: Date
  updated_at: Date
  constructor(user: UserType) {
    const now = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.role = user.role
    this.created_at = user.created_at || now
    this.updated_at = user.updated_at || now
  }
}
