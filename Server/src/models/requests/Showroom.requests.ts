import { ParamsDictionary } from 'express-serve-static-core'

export interface GetShowroomReqParams extends ParamsDictionary {
  region: string
}
