import { Router, Request, Response, NextFunction } from 'express'
import showroomController from '~/controllers/showrooms.controller'
import { regionValidator } from '~/middlewares/showrooms.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const showroomRouter = Router()

/**
 * Description. Get showrooms by region
 * Method: Get
 * Path: '/region/:region'
 * Body: None
 */
showroomRouter.get('/region/:region', regionValidator, wrapRequestHandler(showroomController.getShowroomsByRegion))

const showroomRoute: Route = {
  path: '/showrooms',
  router: showroomRouter
}

export default showroomRoute
