import { CategoryType } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

export interface CategoryRequestBody {
  name: string
  category: CategoryType
  parent_category: CategoryType
}

export interface GetCategoriesReqParams extends ParamsDictionary {
  category: string
}
