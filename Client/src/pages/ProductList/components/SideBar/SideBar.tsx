import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import categoriesApi from 'src/apis/category.api'
import { ChevronDoubleRightIcon } from 'src/assets/icons'
import { CategoryType } from 'src/constants/category.enum'
import { toSlug } from 'src/utils/utils'
const Title = (props: { children: React.ReactNode }) => {
  return <div className='border-b border-[#d9d9d9] py-3 text-sm font-bold uppercase'>{props.children}</div>
}

const FilterGroupItem = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex items-center'>{children}</div>
}

const FilterItem = ({ name, quantity }: { name: string; quantity: number }) => {
  return (
    <div className='flex w-full items-center gap-2 py-2'>
      <input type='checkbox' className='cursor-pointer' id='asus' />
      <label htmlFor='asus' className='cursor-pointer text-xs'>
        {name} ({quantity})
      </label>
    </div>
  )
}
export default function SideBar(props: { category: CategoryType }) {
  const { data: dataNestedCategorisList } = useQuery({
    queryKey: ['categories', props.category],
    queryFn: () => categoriesApi.getNestedCategories(props.category)
  })
  const nestedCategories = dataNestedCategorisList?.data.data
  return (
    <div className='w-[280px] shrink-0 px-[10px] py-0'>
      <div className='my-[10px] rounded border border-[#d9d9d9] text-center text-xs font-semibold uppercase leading-8'>
        Lọc sản phẩm
      </div>
      {/* Danh mục */}
      <div>
        <Title>Danh mục</Title>
        <div className='px-[10px] py-3'>
          {nestedCategories &&
            nestedCategories.map((category) => (
              <div key={category._id} className='mb-2 flex items-center gap-1'>
                <ChevronDoubleRightIcon />
                <Link
                  to={`/${toSlug(category.name.toLocaleLowerCase().replace(/[ ]/g, '-').split(',').join(''))}`}
                  className='text-xs font-bold capitalize'
                >
                  {category.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* Hãng sản xuất */}
      <div>
        <Title>Hãng sản xuất</Title>
        <FilterGroupItem>
          <FilterItem name='ASUS' quantity={52} />
          <FilterItem name='ACER' quantity={50} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='AMAZON' quantity={6} />
          <FilterItem name='APPLE' quantity={98} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='CHUWI' quantity={1} />
          <FilterItem name='DELL' quantity={114} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='HP' quantity={111} />
          <FilterItem name='IMIN' quantity={1} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='LENOVO' quantity={96} />
          <FilterItem name='LG' quantity={13} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='MICROSOFT' quantity={26} />
          <FilterItem name='MSI' quantity={24} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='SAMSUNG' quantity={17} />
          <FilterItem name='VAIO' quantity={4} />
        </FilterGroupItem>
        <FilterGroupItem>
          <FilterItem name='XIAOMI' quantity={2} />
        </FilterGroupItem>
      </div>
      {/* Phong cách */}
      <div>
        <Title>Phong cách</Title>
      </div>
      {/* Giới tính */}
      <div>
        <Title>Giới tính</Title>
      </div>
      {/* Màu sắc */}
      <div>
        <Title>Màu sắc</Title>
      </div>
      {/* Phân loại LAPTOP */}
      <div>
        <Title>Phân loại LAPTOP</Title>
      </div>
      {/* CPU */}
      <div>
        <Title>CPU</Title>
      </div>
      {/* CPU */}
      <div>
        <Title>CPU</Title>
      </div>
      {/* RAM */}
      <div>
        <Title>RAM</Title>
      </div>
      {/* Ổ cứng */}
      <div>
        <Title>Ổ cứng</Title>
      </div>
      {/* VGA - Card màn hình */}
      <div>
        <Title>VGA - Card màn hình</Title>
      </div>
      {/* Kích thước màn hình */}
      <div>
        <Title>Kích thước màn hình</Title>
      </div>
      {/* Độ phân giải màn hình */}
      <div>
        <Title>Độ phân giải màn hình</Title>
      </div>
      {/* Cảm ứng màn hình */}
      <div>
        <Title>Cảm ứng màn hình</Title>
      </div>
      {/* Tần số màn hình */}
      <div>
        <Title>Tần số màn hình</Title>
      </div>
      {/* Hệ điều hành */}
      <div>
        <Title>Hệ điều hành</Title>
      </div>
    </div>
  )
}
