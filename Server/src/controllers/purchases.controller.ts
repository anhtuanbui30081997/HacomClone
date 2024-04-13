import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PURCHASE_MESSAGES } from '~/constants/messages'
import { PurchaseRequestBody } from '~/models/requests/Purchase.requests'
import purchaseService from '~/services/purchase.service'

class PurchaseController {
  async addPurchase(req: Request<ParamsDictionary, any, PurchaseRequestBody>, res: Response, next: NextFunction) {
    const purchase = req.body
    const { insertedId } = await purchaseService.addPurchase(purchase, req)
    return res.json({
      message: PURCHASE_MESSAGES.ADD_PURCHASE_SUCCESSFULLY,
      data: insertedId
    })
  }

  async uploadImagesPurchase(req: Request, res: Response, next: NextFunction) {
    const url = await purchaseService.uploadImagesPurchase(req)
    return res.json({
      message: PURCHASE_MESSAGES.ADD_PURCHASE_SUCCESSFULLY,
      data: url
    })
  }
}

const purchaseController = new PurchaseController()
export default purchaseController
