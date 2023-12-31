import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USER_MESSAGES } from '~/constants/messages'
import {
  ForgotPasswordRequestBody,
  LoginRequestBody,
  LogoutRequestBody,
  RefreshTokenRequestBody,
  RegisterRequestBody,
  TokenPayload,
  UpdatePasswordRequestBody
} from '~/models/requests/User.requests'
import { User } from '~/models/schemas/User.schema'
import userService from '~/services/user.service'

class UserController {
  async register(req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response, next: NextFunction) {
    const result = await userService.register(req.body)
    res.json({
      message: USER_MESSAGES.REGISTER_SUCCESSFULLY,
      result
    })
  }

  async login(req: Request<ParamsDictionary, any, LoginRequestBody>, res: Response, next: NextFunction) {
    const user_id = (req.user as User)._id
    const result = await userService.login(user_id.toString())
    res.json({
      message: USER_MESSAGES.LOGIN_SUCCESSFULLY,
      result
    })
  }

  async logout(req: Request<ParamsDictionary, any, LogoutRequestBody>, res: Response, next: NextFunction) {
    const { user_id } = req.decoded_refresh_token as TokenPayload
    const refresh_token = req.body.refresh_token
    const result = await userService.logout({ user_id, refresh_token })
    res.json({
      message: USER_MESSAGES.LOGOUT_SUCCESSFULLY,
      result
    })
  }

  async refreshToken(req: Request<ParamsDictionary, any, RefreshTokenRequestBody>, res: Response, next: NextFunction) {
    const { user_id } = req.decoded_refresh_token as TokenPayload
    const refresh_token = req.body.refresh_token
    const result = await userService.refreshToken({ user_id, refresh_token })
    res.json({
      message: USER_MESSAGES.REFRESH_TOKEN_SUCCESSFULLY,
      result
    })
  }

  async forgotTokenRequest(
    req: Request<ParamsDictionary, any, ForgotPasswordRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    const email = req.body.email
    const forgotPasswordToken = await userService.forgotTokenRequest(email)
    res.json({
      message: USER_MESSAGES.FORGOT_PASSWORD_REQUEST_SUCCESSFULLY,
      result: forgotPasswordToken
    })
  }

  async updatePassword(
    req: Request<ParamsDictionary, any, UpdatePasswordRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    const { new_password } = req.body
    const { user_id } = req.decodeed_forgot_password_token as TokenPayload
    const user = await userService.updatePassword({ user_id, password: new_password })
    res.json({
      message: USER_MESSAGES.UPDATE_PASSWORD_SUCCESSFULLY,
      result: user
    })
  }
}

const userController = new UserController()
export default userController
