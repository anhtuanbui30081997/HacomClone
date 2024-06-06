import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryType } from '~/constants/enums'
import { PRODUCT_MESSAGES } from '~/constants/messages'
import {
  GetProductDetailReqParams,
  GetProductListQuery,
  ProductRequestBody,
  SearchProductReqParams
} from '~/models/requests/Product.requests'
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
    const { limit, page } = req.query
    const { productList, total, productListSize } = await productService.getProductList(req.query)
    return res.json({
      message: PRODUCT_MESSAGES.GET_PRODUCT_LIST_SUCCESSFULLY,
      data: {
        products: productList,
        page: Number(page),
        limit: Number(limit),
        total: total,
        page_size: Math.ceil(productListSize / Number(limit))
      }
    })
  }

  async getProductDetail(req: Request<GetProductDetailReqParams, any, any, any>, res: Response, next: NextFunction) {
    const { id } = req.params
    const product = await await productService.getProductDetail(id)
    return res.json({
      message: PRODUCT_MESSAGES.GET_PRODUCT_DETAIL_SUCCESSFULLY,
      data: product
    })
  }

  async getQuantity(req: Request<ParamsDictionary, any, any, any>, res: Response, next: NextFunction) {
    const {
      brand,
      style,
      color,
      laptopCategory,
      cpu,
      ram,
      vga,
      screenSize,
      screenResolution,
      operationSystem,
      screenFrequency,
      touchScreen
    } = await productService.getQuantity()
    return res.json({
      message: PRODUCT_MESSAGES.GET_QUANTITY_SUCCESSFULLY,
      data: {
        brand,
        style,
        color,
        laptopCategory,
        cpu,
        ram,
        vga,
        screenSize,
        screenResolution,
        operationSystem,
        touchScreen,
        screenFrequency
      }
    })
  }

  async searchProduct(req: Request<SearchProductReqParams, any, any, any>, res: Response, next: NextFunction) {
    const { name } = req.params
    const productList = await productService.searchProduct(name)
    return res.json({
      message: PRODUCT_MESSAGES.SEARHC_PRODUCT_SUCCESSFULLY,
      data: productList
    })
  }
}

const productController = new ProductController()
export default productController
