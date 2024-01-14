import { ObjectId } from 'mongodb'
import { RegionType } from '~/constants/enums'

interface ShowroomType {
  _id?: ObjectId
  name: string
  region: RegionType
  address: string
  phone_number: string
  email: string
  time: string
  map: string
}

export class Showroom {
  _id?: ObjectId
  name: string
  region: RegionType
  address: string
  phone_number: string
  email: string
  time: string
  map: string
  constructor(showroom: ShowroomType) {
    this.name = showroom.name
    this.address = showroom.address
    this.phone_number = showroom.phone_number
    this.region = showroom.region
    this.email = showroom.email
    this.time = showroom.time
    this.map = showroom.map
  }
}
