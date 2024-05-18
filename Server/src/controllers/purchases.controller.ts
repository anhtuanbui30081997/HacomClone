import { NextFunction, Request, Response } from 'express'
import { PURCHASE_MESSAGES } from '~/constants/messages'
import purchaseService from '~/services/purchase.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddToCartReqBody, GetPurchasesReqParams } from '~/models/requests/Purchase.requests'
import { TokenPayload } from '~/models/requests/User.requests'

class PurchaseController {
  async addToCart(req: Request<ParamsDictionary, any, AddToCartReqBody, any>, res: Response, next: NextFunction) {
    const { buy_count, product_id} = req.body
    const { user_id } = req.decoded_access_token as TokenPayload
    const purchase = await purchaseService.addToCart({
      product_id: product_id,
      buy_count: Number(buy_count),
      user_id: user_id
    })
    return res.json({
      message: PURCHASE_MESSAGES.ADD_TO_CART_SUCCESSFULLY,
      data: purchase
    })
  }

  async getPurchases(req: Request<GetPurchasesReqParams, any, any, any>, res: Response, next: NextFunction) {
    const { purchase_status } = req.params
    const {user_id} = req.decoded_access_token as TokenPayload
    const purchases = await purchaseService.getPurchases(Number(purchase_status), user_id)
    return res.json({
      message: PURCHASE_MESSAGES.GET_PURCHASES_SUCESSFULLY,
      data: purchases
    })
  }
}

const purchaseController = new PurchaseController()
export default purchaseController
