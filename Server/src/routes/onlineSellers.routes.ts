import { Router } from 'express'
import onlineSellerController from '~/controllers/onlineSellers.controller'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const onlineSellerRouter = Router()
/**
 * Description. Get All Online Sellers
 * Method: Get
 * Path: '/'
 * Body: None
 */
onlineSellerRouter.get('/', wrapRequestHandler(onlineSellerController.getAllOnlineSellers))

const onlineSellerRoute: Route = {
  path: '/online-sellers',
  router: onlineSellerRouter
}

export default onlineSellerRoute
