import { useQuery } from '@tanstack/react-query'

import { Link } from 'react-router-dom'
import categoriesApi from 'src/apis/category.api'
import { ChevronRightIcon } from 'src/assets/icons'
import { CategoryType } from 'src/constants/category.enum'
import path from 'src/constants/path'
import { toSlug } from 'src/utils/utils'

export default function YouAreHere(props: { category: CategoryType }) {
  const { data: dataAllParentCategorisList } = useQuery({
    queryKey: ['parent-categories', props.category],
    queryFn: () => categoriesApi.getAllParentCategories(props.category)
  })
  const youAreHereCategories = dataAllParentCategorisList?.data.data
  return (
    <div className='mt-8 flex items-center'>
      <Link to={path.home} className='text-sm font-semibold text-[#555]'>
        Trang chủ
      </Link>
      {youAreHereCategories &&
        youAreHereCategories.map((category) => (
          <div key={category._id}>
            <span className='mx-2'>
              <ChevronRightIcon />
            </span>
            <Link
              to={`/${toSlug(category.name.toLocaleLowerCase().replace(/[ ]/g, '-').split(',').join(''))}`}
              className='text-sm font-semibold text-[#243a76]'
            >
              {category.name}
            </Link>
          </div>
        ))}
    </div>
  )
}
