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
      brand: queryParams.brand,
      style: queryParams.style,
      color: queryParams.color,
      cpu: queryParams.cpu,
      ram: queryParams.ram,
      vga: queryParams.vga,
      laptop_category: queryParams.laptop_category,
      operation_system: queryParams.operation_system,
      screen_frequency: queryParams.screen_frequency,
      screen_resolution: queryParams.screen_resolution,
      size_screen: queryParams.size_screen,
      touch_screen: queryParams.touch_screen
    },
    isUndefined
  )
  return queryConfig
}
