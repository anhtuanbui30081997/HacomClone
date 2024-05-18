import { Router } from 'express'
import purchaseController from '~/controllers/purchases.controller'
import { addToCartValidator } from '~/middlewares/purchases.middleware'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const purchaseRouter = Router()

purchaseRouter.post(
  '/add-to-cart',
  accessTokenValidator,
  addToCartValidator,
  wrapRequestHandler(purchaseController.addToCart)
)

purchaseRouter.get('/:purchase_status', accessTokenValidator, wrapRequestHandler(purchaseController.getPurchases))

const purchaseRoute: Route = {
  path: '/purchases',
  router: purchaseRouter
}

export default purchaseRoute
