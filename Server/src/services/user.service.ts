import { RegisterRequestBody, TokenPayload } from '~/models/requests/User.requests'
import databaseService from './database.service'
import { User } from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { TokenType } from '~/constants/enums'
import { signToken } from '~/utils/jwt'
import { ObjectId } from 'mongodb'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'

class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          exp
        },
        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessTokenAndRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken({ user_id, exp })])
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async register({ email, name, password }: RegisterRequestBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        _id: user_id,
        email,
        name,
        password: hashPassword(password)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({ user_id: user_id.toString() })
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id,
        token: refresh_token
      })
    )
    return {
      access_token,
      refresh_token
    }
  }
}

const userService = new UserService()
export default userService
