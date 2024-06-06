import { ProductList, ProductListConfig, ProductType, Quantity } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http, { Http } from 'src/utils/http'

const URL = 'products'
const httpForMultipart = new Http('multipar/form-data').instance
export type SearchProductType = { _id: string; name: string; new_price: number; images: string[] }
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
  },
  getQuantity() {
    return http.get<SuccessResponse<Quantity>>(`${URL}/laptop/`)
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<ProductType>>(`${URL}/${id}`)
  },
  searchProduct(name: string) {
    return http.get<SuccessResponse<SearchProductType[]>>(`${URL}/search/${name}`)
  }
}

export default productApi
