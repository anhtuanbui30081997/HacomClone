import { Router } from 'express'
import mediasController from '~/controllers/medias.controller'
import { Route } from '~/models/Route'

const staticRouter = Router()

staticRouter.get('/image/:name', mediasController.serveImageController)

const staticRoute: Route = {
  path: '/static',
  router: staticRouter
}

export default staticRoute
