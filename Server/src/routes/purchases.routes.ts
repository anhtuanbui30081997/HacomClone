import { Router, Request, Response, NextFunction } from 'express'
import purchaseController from '~/controllers/purchases.controller'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const purchaseRouter = Router()

purchaseRouter.post('/', wrapRequestHandler(purchaseController.addPurchase))

purchaseRouter.post('/upload-images', wrapRequestHandler(purchaseController.uploadImagesPurchase))

const purchaseRoute: Route = {
  path: '/purchases',
  router: purchaseRouter
}

export default purchaseRoute
