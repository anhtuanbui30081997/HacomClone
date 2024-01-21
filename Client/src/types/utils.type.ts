import { User } from './user.type'

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  errors?: Data
}

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user: User
}>

export type ErrorsEntityType = {
  msg: string
  [key: string]: any
}

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
}>
