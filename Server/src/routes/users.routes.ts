import { Router } from 'express'
import userController from '~/controllers/users.controller'
import { RegisterValidator } from '~/middlewares/users.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
/**
 * Method: Post
 * Path: '/register'
 * Body: RegisterRequestBody
 */
usersRouter.post('/register', RegisterValidator, wrapRequestHandler(userController.register))

const userRoute: Route = {
  path: '/users',
  router: usersRouter
}

export default userRoute
