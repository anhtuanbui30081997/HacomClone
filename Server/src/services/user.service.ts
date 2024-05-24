import { RegisterRequestBody, TokenPayload } from '~/models/requests/User.requests'
import databaseService from './database.service'
import { User } from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { RoleType, TokenType } from '~/constants/enums'
import { signToken, verifyToken } from '~/utils/jwt'
import { ObjectId } from 'mongodb'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'
import { ErrorWithStatus } from '~/models/Errors'
import { USER_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

class UserService {
  private signAccessToken({ user_id, role }: { user_id: string; role: RoleType }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        role
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, exp, role }: { user_id: string; exp?: number; role: RoleType }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          role,
          token_type: TokenType.RefreshToken,
          exp
        },
        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      })
    }
    return signToken({
      payload: {
        user_id,
        role,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessTokenAndRefreshToken({ user_id, exp, role }: { user_id: string; exp?: number; role: RoleType }) {
    return Promise.all([this.signAccessToken({ user_id, role }), this.signRefreshToken({ user_id, exp, role })])
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
        role: RoleType.User,
        password: hashPassword(password)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString(),
      role: RoleType.User
    })
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
      console.log(old_refresh_token)
      const { exp, iat } = await this.decodeRefreshToken(old_refresh_token.token)
      const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
        user_id,
        exp,
        role: RoleType.User
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
  async loginAdmin(user_id: string) {
    const old_refresh_token = await databaseService.refreshTokens.findOne({
      user_id: new ObjectId(user_id)
    })
    if (old_refresh_token) {
      const { exp, iat } = await this.decodeRefreshToken(old_refresh_token.token)
      const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
        user_id,
        exp,
        role: RoleType.Admin
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

  async refreshToken({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    const { exp, iat, role } = await this.decodeRefreshToken(refresh_token)
    const [access_token, new_refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id,
      exp,
      role
    })
    // Update new refresh_token into database
    await databaseService.refreshTokens.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        token: refresh_token
      },
      {
        $set: {
          token: new_refresh_token,
          iat: new Date(iat * 1000)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      access_token,
      refresh_token: new_refresh_token
    }
  }

  async forgotTokenRequest(email: string) {
    const user = await databaseService.users.findOne({
      email
    })
    const forgot_password_token = await this.signForgotPasswordToken((user as User)._id.toString())
    /** Not implement yet */
    // send a email contain forgot_password_token to this email. When user click to forgot_password_token link,
    // Client will send forgot_password_token, and new_password to Server. Server will verify forgot_password_token.
    // If forgot_password_token valid, server will update new password to database
    return { forgot_password_token }
  }

  async updatePassword({ user_id, password }: { user_id: string; password: string }) {
    const user = await databaseService.users.findOneAndUpdate(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          password: hashPassword(password)
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        projection: {
          password: 0
        },
        returnDocument: 'after'
      }
    )
    return user as User
  }

  async getAllUsers() {
    const users = await databaseService.users
      .find(
        {},
        {
          projection: {
            password: 0
          }
        }
      )
      .toArray()
    return users
  }

  async deleteOneUsers({ email }: { email: string }) {
    // Delete this user and database ralated to this user
    const result = await databaseService.users.findOneAndDelete(
      { email: email },
      {
        projection: {
          password: 0
        }
      }
    )
    if (!result) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_MESSAGES.EMAIL_IS_NOT_FOUNDED
      })
    }
    return result
  }
}

const userService = new UserService()
export default userService
