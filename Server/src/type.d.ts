// Define cac global type for project
import { Request } from 'express'
import { User } from './models/schemas/User.schema'
import { TokenPayload } from './models/requests/User.requests'
declare module 'express' {
  interface Request {
    user?: User
    decoded_access_token?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decodeed_forgot_password_token?: TokenPayload
  }
}
