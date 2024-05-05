import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      category: queryParams.category || 1,
      brand: queryParams.brand
    },
    isUndefined
  )
  return queryConfig
}
