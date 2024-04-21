import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryType } from '~/constants/enums'
import { PURCHASE_MESSAGES } from '~/constants/messages'
import { GetPurchaseListRequestParams, PurchaseRequestBody } from '~/models/requests/Purchase.requests'
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
      message: PURCHASE_MESSAGES.UPLOAD_PURCHASE_IMAGES_SUCCESSFULLY,
      data: url
    })
  }

  async getPurchaseList(req: Request<GetPurchaseListRequestParams, any, any>, res: Response, next: NextFunction) {
    const { category } = req.params
    console.log('category:', category)
    const purchases = await await purchaseService.getPurchaseList(Number(category) as CategoryType)
    return res.json({
      message: PURCHASE_MESSAGES.GET_PURCHASE_LIST_SUCCESSFULLY,
      data: purchases
    })
  }
}

const purchaseController = new PurchaseController()
export default purchaseController
