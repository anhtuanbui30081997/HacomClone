import { Router, Request, Response, NextFunction } from 'express'
import { Route } from '~/models/Route'

const purchaseRouter = Router()

purchaseRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body:', req.body)
  res.json('Create purchase success')
})

const purchaseRoute: Route = {
  path: '/purchases',
  router: purchaseRouter
}

export default purchaseRoute
