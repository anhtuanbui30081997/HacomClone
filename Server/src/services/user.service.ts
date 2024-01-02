import { RegisterRequestBody, TokenPayload } from '~/models/requests/User.requests'
import databaseService from './database.service'
import { User } from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { TokenType } from '~/constants/enums'
import { signToken, verifyToken } from '~/utils/jwt'
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

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({ token: refresh_token, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string })
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
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id,
        token: refresh_token,
        exp,
        iat
      })
    )
    return {
      access_token,
      refresh_token
    }
  }

  async login(user_id: string) {
    const old_refresh_token = await databaseService.refreshTokens.findOne({
      user_id: new ObjectId(user_id)
    })
    if (old_refresh_token) {
      const { exp, iat } = await this.decodeRefreshToken(old_refresh_token.token)
      const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
        user_id,
        exp
      })
      // Update new refresh_token into database
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({
          user_id: new ObjectId(user_id),
          token: refresh_token,
          exp,
          iat
        })
      )
      return {
        access_token,
        refresh_token
      }
    }
  }

  async logout({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    // Delete refresh_token in database
    const result = await databaseService.refreshTokens.findOneAndDelete(
      {
        user_id: new ObjectId(user_id),
        token: refresh_token
      },
      {
        projection: {
          token: 0
        }
      }
    )
    return result
  }
}

const userService = new UserService()
export default userService
