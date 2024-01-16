import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ONLINE_SELLER_MESSAGES } from '~/constants/messages'
import onlineService from '~/services/onlineSeller.service'
class OnlineSellersController {
  async getAllOnlineSellers(req: Request, res: Response, next: NextFunction) {
    const onlineSellers = await onlineService.getAllOnlineSeller()
    return res.status(HTTP_STATUS.OK).json({
      message: ONLINE_SELLER_MESSAGES.GET_ALL_ONLINE_SELLERS_SUCCESSFULLY,
      data: onlineSellers
    })
  }
}

const onlineSellerController = new OnlineSellersController()
export default onlineSellerController
