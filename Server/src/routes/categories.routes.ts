import { Router } from 'express'
import categoriesController from '~/controllers/categories.controller'
import { categoryTypeValidator, categoryValidator } from '~/middlewares/categories.middleware'
import { Route } from '~/models/Route'
import { wrapRequestHandler } from '~/utils/handlers'

const categoriesRouter = Router()

/**
 * Description.  Create new category
 * Path: /create-category
 * Method: POST
 * Body: CategoryRequestBody
 */
categoriesRouter.post('/create-category', categoryValidator, wrapRequestHandler(categoriesController.createCategory))

/**
 * Description.  Create new category
 * Path: /
 * Method: POST
 * Body: CategoryRequestBody
 */
categoriesRouter.get('/:category', categoryTypeValidator, wrapRequestHandler(categoriesController.getCategories))
/**
 * Description.  Create new category
 * Path: /
 * Method: POST
 * Body: CategoryRequestBody
 */
categoriesRouter.get(
  '/all-categories/:category',
  categoryTypeValidator,
  wrapRequestHandler(categoriesController.getAllCategories)
)

const categoriesRoute: Route = {
  path: '/categories',
  router: categoriesRouter
}

export default categoriesRoute
