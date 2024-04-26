import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import ProductItem from './components/ProductItem'
import { CategoryType } from 'src/constants/category.enum'
import SlideShow from './components/SlideShow'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import YouAreHere from './components/YouAreHere'
import TopSearch from './components/TopSearch'

// Export Component
export default function ProductList(props: { category: CategoryType }) {
  const categories = Object.values(CategoryType).filter((value) => typeof value === 'string')
  const title = categories[props.category] as string
  const { data: dataProductList } = useQuery({
    queryKey: ['products', props.category],
    queryFn: () => productApi.getProductList(props.category)
  })
  const productList = dataProductList?.data.data

  return (
    <div className='bg-white py-6'>
      <div className='container mx-auto'>
        <TopSearch />
        <YouAreHere category={props.category} />
        <div className='mt-8 w-max border-b-2 border-[#243a76]'>
          <span className='text-2xl font-bold uppercase text-[#243a76]'>{title.replace(/[A-Z]/g, ' $&').slice(1)}</span>
          <span className='ml-2 text-xs text-gray-400'>(Tổng {productList?.length} sản phẩm)</span>
        </div>
        <div className='mt-5'>
          <SlideShow />
        </div>
        <div className='mt-5 flex flex-row'>
          <SideBar category={props.category} />
          <div className='grow'>
            <TopBar />
            <div className='py-5'>
              <div className='grid grid-cols-4 gap-3'>
                {productList
                  ? productList.map((productItem) => (
                      <div key={productItem._id} className='col-span-1'>
                        <ProductItem {...productItem} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
