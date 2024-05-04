import { ProductList, ProductListConfig, ProductType } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http, { Http } from 'src/utils/http'

const URL = 'products'
const httpForMultipart = new Http('multipar/form-data').instance
const productApi = {
  addProduct(body: ProductType) {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  uploadImageProduct(body: FormData) {
    return httpForMultipart.post<SuccessResponse<{ url: string; type: number }[]>>(`${URL}/upload-images`, body)
  },
  getProductList(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  }
}

export default productApi
