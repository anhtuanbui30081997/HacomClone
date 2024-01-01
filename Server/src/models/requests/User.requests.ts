import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

export interface TokenPayload extends JwtPayload {
  user_id: string
  tokenType: TokenType
  exp: number
  iat: number
}

export interface RegisterRequestBody {
  email: string
  name: string
  password: string
}

export interface LoginRequestBody {
  email: string
  password: string
}
export interface LogoutRequestBody {
  refresh_token: string
}
