export type RegionType = 0 | 1 | 2 | 3

export interface ShowroomType {
  _id?: string
  name: string
  region: RegionType
  address: string
  phone_number: string
  email: string
  time: string
  map: string
}
