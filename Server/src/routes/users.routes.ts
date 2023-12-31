import { Router, Request, Response, NextFunction } from 'express'
import { RegisterValidator } from '~/middlewares/users.middleware'
import { Route } from '~/models/Route'

const usersRouter = Router()
/**
 * Method: Post
 * Path: '/register'
 * Body: RegisterRequestBody
 */
usersRouter.post('/register', RegisterValidator, (req: Request, res: Response, next: NextFunction) => {
  return res.json('OK')
})

const userRoute: Route = {
  path: '/users',
  router: usersRouter
}

export default userRoute
