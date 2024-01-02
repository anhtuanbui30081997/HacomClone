import { Router } from 'express'
import userController from '~/controllers/users.controller'
import {
  LoginValidator,
  RegisterValidator,
  accessTokenValidator,
  forgotPasswordRequestValidator,
  refreshTokenValidator,
  updatePasswordValidator
} from '~/middlewares/users.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'
import { Response, Request, NextFunction } from 'express'

const usersRouter = Router()
/**
 * Description. Register account
 * Method: Post
 * Path: '/register'
 * Body: RegisterRequestBody
 */
usersRouter.post('/register', RegisterValidator, wrapRequestHandler(userController.register))

/**
 * Description. Login to account
 * Method: Post
 * Path: '/login'
 * Body: LoginRequestBody
 */
usersRouter.post('/login', LoginValidator, wrapRequestHandler(userController.login))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(userController.logout))

/**
 * Description. Refresh access token
 * Path: /refresh-token
 * Method: POST
 * Body: {refresh_token: string}
 */
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(userController.refreshToken))

/**
 * Description. Refresh access token
 * Path: /forgot-password-request
 * Method: POST
 * Body: {email: string}
 */
usersRouter.post(
  '/forgot-password-request',
  forgotPasswordRequestValidator,
  wrapRequestHandler(userController.forgotTokenRequest)
)

/**
 * Description. Refresh access token
 * Path: /forgot-password-request
 * Method: PUT
 * Body: UpdatePasswordRequestBody
 */
usersRouter.post('/update-password', updatePasswordValidator, wrapRequestHandler(userController.updatePassword))

const userRoute: Route = {
  path: '/users',
  router: usersRouter
}

export default userRoute
