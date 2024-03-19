import { PurchaseType } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addPurchase(body: PurchaseType) {
    return http.post<SuccessResponse<PurchaseType>>(URL, body)
  }
}

export default purchaseApi
