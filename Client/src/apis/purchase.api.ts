import { CategoryType } from 'src/constants/category.enum'
import { PurchaseType } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http, { Http } from 'src/utils/http'

const URL = 'purchases'
const httpForMultipart = new Http('multipar/form-data').instance
const purchaseApi = {
  addPurchase(body: PurchaseType) {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  uploadImagePurchase(body: FormData) {
    return httpForMultipart.post<SuccessResponse<{ url: string; type: number }[]>>(`${URL}/upload-images`, body)
  },
  getPurchaseList(category: CategoryType) {
    return http.get<SuccessResponse<PurchaseType[]>>(`${URL}/${category}`)
  }
}

export default purchaseApi
