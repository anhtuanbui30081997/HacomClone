import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USER_MESSAGES } from '~/constants/messages'
import { RegisterRequestBody } from '~/models/requests/User.requests'
import userService from '~/services/user.service'

class UserController {
  async register(req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response, next: NextFunction) {
    const result = await userService.register(req.body)
    res.json({
      message: USER_MESSAGES.REGISTER_SUCCESSFULLY,
      result
    })
  }
}

const userController = new UserController()
export default userController
