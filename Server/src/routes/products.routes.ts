import { Router } from 'express'
import productController from '~/controllers/products.controller'
import { productIdValidator } from '~/middlewares/products.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const productRouter = Router()

productRouter.post('/', wrapRequestHandler(productController.addProduct))

productRouter.get('', wrapRequestHandler(productController.getProductList))

productRouter.get('/laptop/', wrapRequestHandler(productController.getQuantity))

productRouter.get('/:id', productIdValidator, wrapRequestHandler(productController.getProductDetail))

productRouter.post('/upload-images', wrapRequestHandler(productController.uploadImagesProduct))

const productRoute: Route = {
  path: '/products',
  router: productRouter
}

export default productRoute
