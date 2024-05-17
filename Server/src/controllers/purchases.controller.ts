import { NextFunction, Request, Response } from 'express'
import { PURCHASE_MESSAGES } from '~/constants/messages'
import purchaseService from '~/services/purchase.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddToCartReqBody } from '~/models/requests/Purchase.requests'

class PurchaseController {
  async addToCart(req: Request<ParamsDictionary, any, AddToCartReqBody, any>, res: Response, next: NextFunction) {
    const { buy_count, product_id } = req.body
    const purchase = await purchaseService.addToCart({ product_id, buy_count: Number(buy_count) })
    return res.json({
      message: PURCHASE_MESSAGES.ADD_TO_CART_SUCCESSFULLY,
      data: purchase
    })
  }
}

const purchaseController = new PurchaseController()
export default purchaseController
