import { CategoryType } from 'src/constants/category.enum'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

export interface ICategory {
  _id?: string
  name: string
  category: CategoryType
  parent_category: CategoryType
}

const categoriesApi = {
  getNestedCategories(category: CategoryType) {
    return http.get<SuccessResponse<ICategory[]>>(`${URL}/${category}`)
  },
  getAllParentCategories(category: CategoryType) {
    return http.get<SuccessResponse<ICategory[]>>(`${URL}/all-parent-categories/${category}`)
  }
}

export default categoriesApi
