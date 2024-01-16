import { OnlineSellerType } from 'src/types/onlineSeller.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'online-sellers'

const onlineSellerApi = {
  getAllOnlineSellers() {
    return http.get<SuccessResponse<OnlineSellerType[]>>(URL)
  }
}

export default onlineSellerApi
