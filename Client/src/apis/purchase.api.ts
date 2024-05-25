import { PurchaseType } from "src/types/purchase.type"
import { SuccessResponse } from "src/types/utils.type"
import http from "src/utils/http"

const URL = 'purchases'
const purchaseApi = {
  addToCart(body: {product_id: string, buy_count: number}) {
    return http.post<SuccessResponse<PurchaseType>>(`${URL}/add-to-cart`, body)
  },
  getPurchase(status: number) {
    return http.get<SuccessResponse<PurchaseType[]>>(`${URL}/${status}`)
  },
  updatePurchase(body:{product_id: string; buy_count: number}) {
    return http.put<SuccessResponse<PurchaseType>>(URL, body)
  },
  deletePurchase(product_id: string) {
    return http.delete<SuccessResponse<PurchaseType>>(`${URL}/${product_id}`)
  },
  deleteAllPurchase() {
    return http.delete<SuccessResponse<any>>(`${URL}/`)
  }
}

export default purchaseApi