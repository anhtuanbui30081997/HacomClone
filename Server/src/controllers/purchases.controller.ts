import { NextFunction, Request, Response } from 'express'
import { PURCHASE_MESSAGES } from '~/constants/messages'
import purchaseService from '~/services/purchase.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddToCartReqBody, DeletePurchaseReqParam, GetPurchasesReqParams, UpdatePurchaseReqBody } from '~/models/requests/Purchase.requests'
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

  async updatePurchase(req: Request<ParamsDictionary, any, UpdatePurchaseReqBody, any>, res: Response, next: NextFunction) {
    const { product_id, buy_count } = req.body
    const {user_id} = req.decoded_access_token as TokenPayload
    const purchase = await purchaseService.updatePurchase({buy_count, product_id, user_id})
    return res.json({
      message: PURCHASE_MESSAGES.UPDATE_PURCHASE_SUCCESSFULLY,
      data: purchase
    })
  }

  async deletePurchase(req: Request<DeletePurchaseReqParam, any, any, any>, res: Response, next: NextFunction) {
    const {product_id} = req.params
    const {user_id} = req.decoded_access_token as TokenPayload
    const purchases = await purchaseService.deletePurchase({product_id, user_id})
    return res.json({
      message: PURCHASE_MESSAGES.DELETE_PURCHASE_SUCCESSFULLY,
      data: purchases
    })
  }

  async deleteAllPurchaseInCart(req: Request<ParamsDictionary, any, any, any>, res: Response, next: NextFunction) {
    const {user_id} = req.decoded_access_token as TokenPayload
    const purchases = await purchaseService.deleteAllPurchaseInCart(user_id)
    return res.json({
      message: PURCHASE_MESSAGES.DELETE_ALL_PURCHASE_IN_CART_SUCCESSFULLY,
      data: purchases
    })
  }
}

const purchaseController = new PurchaseController()
export default purchaseController
