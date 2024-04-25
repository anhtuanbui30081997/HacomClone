import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { CategoryRequestBody, GetCategoriesReqParams } from '~/models/requests/Category.requests'
import categoryService from '~/services/category.service'
import Logger from '~/utils/logger'

class CategoryController {
  async createCategory(req: Request<ParamsDictionary, any, CategoryRequestBody>, res: Response, next: NextFunction) {
    const data = await categoryService.createCategory(req.body)
    return res.status(HTTP_STATUS.CREATED).json({
      message: CATEGORY_MESSAGES.CREATE_CATEGORY_SUCCESSFULLY,
      data
    })
  }
  async getCategories(req: Request<GetCategoriesReqParams, any, any>, res: Response, next: NextFunction) {
    const { category } = req.params
    const data = await categoryService.getCategories(Number(category) as CategoryType)
    return res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
      data
    })
  }
  async getAllCategories(req: Request<GetCategoriesReqParams, any, any>, res: Response, next: NextFunction) {
    const { category } = req.params
    const data = await categoryService.getAllCategories(Number(category) as CategoryType)
    return res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
      data
    })
  }

  async getAllParentCategories(req: Request<GetCategoriesReqParams, any, any>, res: Response, next: NextFunction) {
    const { category } = req.params
    const data = await categoryService.getAllParentCategories(Number(category) as CategoryType)
    return res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
      data
    })
  }
}

const categoriesController = new CategoryController()
export default categoriesController
