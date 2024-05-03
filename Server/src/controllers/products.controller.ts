import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryType } from '~/constants/enums'
import { PRODUCT_MESSAGES } from '~/constants/messages'
import { GetProductListQuery, ProductRequestBody } from '~/models/requests/Product.requests'
import productService from '~/services/product.service'

class ProductController {
  async addProduct(req: Request<ParamsDictionary, any, ProductRequestBody>, res: Response, next: NextFunction) {
    const product = req.body
    const { insertedId } = await productService.addProduct(product, req)
    return res.json({
      message: PRODUCT_MESSAGES.ADD_PRODUCT_SUCCESSFULLY,
      data: insertedId
    })
  }

  async uploadImagesProduct(req: Request, res: Response, next: NextFunction) {
    const url = await productService.uploadImagesProduct(req)
    return res.json({
      message: PRODUCT_MESSAGES.UPLOAD_PRODUCT_IMAGES_SUCCESSFULLY,
      data: url
    })
  }

  async getProductList(
    req: Request<ParamsDictionary, any, any, GetProductListQuery>,
    res: Response,
    next: NextFunction
  ) {
    const products = await await productService.getProductList(req.query)
    return res.json({
      message: PRODUCT_MESSAGES.GET_PRODUCT_LIST_SUCCESSFULLY,
      data: products
    })
  }
}

const productController = new ProductController()
export default productController
