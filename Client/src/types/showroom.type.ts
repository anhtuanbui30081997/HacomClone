export type RegionType = 0 | 1 | 2 | 3
export enum CodeShowroom {
  HAIBATRUNG,
  DONGDA,
  CAUGIAY,
  HADONG1,
  LONGBIEN,
  THANHTRI,
  DONGANH,
  HADONG2,
  HAIPHONG,
  TUSON,
  BACGIANG,
  PHULY,
  THAINGUYEN,
  THANHHOA,
  VINH,
  HOCHIMINH
}

export interface ShowroomType {
  _id?: string
  name: string
  region: RegionType
  code_showroom: CodeShowroom
  address: string
  phone_number: string
  email: string
  time: string
  map: string
}
