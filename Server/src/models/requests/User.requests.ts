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
