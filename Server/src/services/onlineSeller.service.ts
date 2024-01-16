import { SellerType } from '~/constants/enums'
import databaseService from './database.service'

class OnlineSellerService {
  async getAllOnlineSeller() {
    const onlineSellers = await databaseService.onlineSellers
      .find({
        $or: [{ seller_type: SellerType.Personal }, { seller_type: SellerType.Interprise }]
      })
      .toArray()
    return onlineSellers
  }
}

const onlineService = new OnlineSellerService()
export default onlineService
