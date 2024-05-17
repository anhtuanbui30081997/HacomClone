import { Router } from 'express'
import purchaseController from '~/controllers/purchases.controller'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const purchaseRouter = Router()

purchaseRouter.post('/add-to-cart', wrapRequestHandler(purchaseController.addToCart))

const purchaseRoute: Route = {
  path: '/purchases',
  router: purchaseRouter
}

export default purchaseRoute
