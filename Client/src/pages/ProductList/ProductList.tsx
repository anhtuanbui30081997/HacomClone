import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import ProductItem from './components/ProductItem'
import { CategoryType } from 'src/constants/category.enum'
import SlideShow from './components/SlideShow'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import YouAreHere from './components/YouAreHere'
import TopSearch from './components/TopSearch'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

// Export Component
export default function ProductList(props: { category: CategoryType }) {
  const queryConfig = useQueryConfig()
  queryConfig.category = String(props.category)

  const categories = Object.values(CategoryType).filter((value) => typeof value === 'string')
  const title = categories[props.category] as string

  const { data: dataProductList, isPending } = useQuery({
    queryKey: ['products', props.category, queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })
  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <div className='bg-white py-6'>
      {dataProductList && (
        <div className='container mx-auto'>
          <TopSearch />
          <YouAreHere category={props.category} />
          <div className='mt-8 w-max border-b-2 border-[#243a76]'>
            <span className='text-2xl font-bold uppercase text-[#243a76]'>
              {title.replace(/[A-Z]/g, ' $&').slice(1)}
            </span>
            <span className='ml-2 text-xs text-gray-400'>(Tổng {dataProductList.data.data.total} sản phẩm)</span>
          </div>
          <div className='mt-5'>
            <SlideShow />
          </div>
          <div className='mt-5 flex flex-row'>
            <SideBar category={props.category} queryConfig={queryConfig} />
            <div className='grow'>
              <TopBar pageSize={dataProductList.data.data.page_size} queryConfig={queryConfig} />
              <div className='py-5'>
                <div className='grid grid-cols-4 gap-3'>
                  {dataProductList.data.data.products.map((productItem) => (
                    <div key={productItem._id} className='col-span-1'>
                      <ProductItem {...productItem} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
