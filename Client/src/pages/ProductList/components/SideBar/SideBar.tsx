import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import categoriesApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import { ChevronDoubleRightIcon } from 'src/assets/icons'
import { CategoryType } from 'src/constants/category.enum'
import { Brand } from 'src/types/product.type'
import { toSlug } from 'src/utils/utils'
import FilterGroupItem from '../FilterGroupItem'
import FilterItem from '../FilterItem'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const Title = (props: { children: React.ReactNode }) => {
  return <div className='border-b border-[#d9d9d9] py-3 text-sm font-bold uppercase'>{props.children}</div>
}

export default function SideBar(props: { category: CategoryType; queryConfig: QueryConfig }) {
  const navigate = useNavigate()
  const [brand, setBrand] = useState<Brand | null>(null)
  const { data: dataNestedCategorisList } = useQuery({
    queryKey: ['categories', props.category],
    queryFn: () => categoriesApi.getNestedCategories(props.category)
  })
  const nestedCategories = dataNestedCategorisList?.data.data
  const { data: dataQuantity } = useQuery({
    queryKey: ['quantity'],
    queryFn: productApi.getQuantity
  })
  const quantities = dataQuantity?.data.data

  const handleBrandChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'ASUS':
          setBrand('asus')
          break
        case 'ACER':
          setBrand('acer')
          break
        case 'DELL':
          setBrand('dell')
          break
        case 'HP':
          setBrand('hp')
          break
        case 'LENOVO':
          setBrand('lenovo')
          break
        case 'MSI':
          setBrand('msi')
          break
        case 'MACBOOK':
          setBrand('macbook')
          break
        case 'LG':
          setBrand('lg')
          break
        case 'MICROSOFT':
          setBrand('microsoft')
          break
        case 'VAIO':
          setBrand('vaio')
          break
      }
    } else {
      setBrand(null)
    }
  }
  useEffect(() => {
    navigate({
      pathname: undefined,
      search: createSearchParams({
        ...props.queryConfig,
        brand: brand || ''
      }).toString()
    })
  }, [brand])

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
      <div>
        {/* Hãng sản xuất */}
        <div>
          <Title>Hãng sản xuất</Title>
          {brand == null && (
            <div>
              <FilterGroupItem>
                <FilterItem name='ASUS' quantity={quantities?.brand.asus || 0} onChange={handleBrandChange} />
                <FilterItem name='ACER' quantity={quantities?.brand.acer || 0} onChange={handleBrandChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='DELL' quantity={quantities?.brand.dell || 0} onChange={handleBrandChange} />
                <FilterItem name='HP' quantity={quantities?.brand.hp || 0} onChange={handleBrandChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='LENOVO' quantity={quantities?.brand.lenovo || 0} onChange={handleBrandChange} />
                <FilterItem name='MSI' quantity={quantities?.brand.msi || 0} onChange={handleBrandChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='MACBOOK' quantity={quantities?.brand.macbook || 0} onChange={handleBrandChange} />
                <FilterItem name='LG' quantity={quantities?.brand.lg || 0} onChange={handleBrandChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='MICROSOFT' quantity={quantities?.brand.microsoft || 0} onChange={handleBrandChange} />
                <FilterItem name='VAIO' quantity={quantities?.brand.vaio || 0} onChange={handleBrandChange} />
              </FilterGroupItem>
            </div>
          )}
          {brand === 'asus' && (
            <FilterItem
              name='ASUS'
              quantity={quantities?.brand.asus || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'acer' && (
            <FilterItem
              name='ACER'
              quantity={quantities?.brand.acer || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'dell' && (
            <FilterItem
              name='DELL'
              quantity={quantities?.brand.dell || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'hp' && (
            <FilterItem name='HP' quantity={quantities?.brand.hp || 0} onChange={handleBrandChange} checked={true} />
          )}
          {brand === 'lenovo' && (
            <FilterItem
              name='LENOVO'
              quantity={quantities?.brand.lenovo || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'msi' && (
            <FilterItem name='MSI' quantity={quantities?.brand.msi || 0} onChange={handleBrandChange} checked={true} />
          )}
          {brand === 'macbook' && (
            <FilterItem
              name='MACBOOK'
              quantity={quantities?.brand.macbook || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'lg' && (
            <FilterItem name='LG' quantity={quantities?.brand.lg || 0} onChange={handleBrandChange} checked={true} />
          )}
          {brand === 'microsoft' && (
            <FilterItem
              name='MICROSOFT'
              quantity={quantities?.brand.microsoft || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
          {brand === 'vaio' && (
            <FilterItem
              name='VAIO'
              quantity={quantities?.brand.vaio || 0}
              onChange={handleBrandChange}
              checked={true}
            />
          )}
        </div>
        {/* Phong cách */}
        <div>
          <Title>Phong cách</Title>
          <FilterGroupItem>
            <FilterItem name='Thời trang' quantity={quantities?.style.fashion || 0} />
            <FilterItem name='Gaming' quantity={quantities?.style.gaming || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='Công nghệ' quantity={quantities?.style.technology || 0} />
            <FilterItem name='Thường' quantity={quantities?.style.common || 0} />
          </FilterGroupItem>
        </div>
        {/* Màu sắc */}
        <div>
          <Title>Màu sắc</Title>
          <FilterGroupItem>
            <FilterItem name='Đen' quantity={quantities?.color.black || 0} />
            <FilterItem name='Xám' quantity={quantities?.color.gray || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='Bạc' quantity={quantities?.color.sliver || 0} />
            <FilterItem name='Trắng' quantity={quantities?.color.white || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='Hồng' quantity={quantities?.color.pink || 0} />
            <FilterItem name='Vàng' quantity={quantities?.color.gold || 0} />
          </FilterGroupItem>
          <FilterItem name='Xanh' quantity={quantities?.color.blue || 0} />
        </div>
        {/* Phân loại LAPTOP */}
        <div>
          <Title>Phân loại LAPTOP</Title>
          <FilterItem name='Laptop Gaming' quantity={quantities?.laptopCategory.laptopGaming || 0} />
          <FilterItem name='Đồ họa, Kiến trúc' quantity={quantities?.laptopCategory.doHoaKienTruc || 0} />
          <FilterItem name='Phổ thông, Văn phòng' quantity={quantities?.laptopCategory.phoThongVanPhong || 0} />
          <FilterItem name='Mỏng nhẹ, Thời trang' quantity={quantities?.laptopCategory.mongNheThoiTrang || 0} />
          <FilterItem name='Doanh nhân' quantity={quantities?.laptopCategory.doanhNhan || 0} />
        </div>
        {/* CPU */}
        <div>
          <Title>CPU</Title>
          <FilterItem name='Intel Celeron/Pentium' quantity={quantities?.cpu.intelCeleronPentium || 0} />
          <FilterItem name='Intel Core i3' quantity={quantities?.cpu.intelCorei3 || 0} />
          <FilterItem name='Intel Core i5' quantity={quantities?.cpu.intelCorei5 || 0} />
          <FilterItem name='Intel Core i7' quantity={quantities?.cpu.intelCorei7 || 0} />
          <FilterItem name='Intel Core i9' quantity={quantities?.cpu.intelCorei9 || 0} />
          <FilterItem name='AMD Ryzen 3' quantity={quantities?.cpu.amdRyzen3 || 0} />
          <FilterItem name='AMD Ryzen 5' quantity={quantities?.cpu.amdRyzen5 || 0} />
          <FilterItem name='AMD Ryzen 7' quantity={quantities?.cpu.amdRyzen7 || 0} />
          <FilterItem name='Apple M1' quantity={quantities?.cpu.appleM1 || 0} />
          <FilterItem name='Apple M2' quantity={quantities?.cpu.appleM2 || 0} />
          <FilterItem name='Apple M3' quantity={quantities?.cpu.appleM3 || 0} />
        </div>
        {/* RAM */}
        <div>
          <Title>RAM</Title>
          <FilterGroupItem>
            <FilterItem name='4GB' quantity={quantities?.ram.ram_4GB || 0} />
            <FilterItem name='8GB' quantity={quantities?.ram.ram_8GB || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='16GB' quantity={quantities?.ram.ram_16GB || 0} />
            <FilterItem name='32GB' quantity={quantities?.ram.ram_32GB || 0} />
          </FilterGroupItem>
          <FilterItem name='>32GB' quantity={quantities?.ram.ram_gt_32GB || 0} />
        </div>
        {/* VGA - Card màn hình */}
        <div>
          <Title>VGA - Card màn hình</Title>
          <FilterItem name='VGA NVIDIA' quantity={quantities?.vga.vgaNvidia || 0} />
          <FilterItem name='VGA AMD' quantity={quantities?.vga.vgaAmd || 0} />
          <FilterItem name='VGA Tích hợp (Onboard)' quantity={quantities?.vga.vagTichHop || 0} />
          <FilterItem name='RTX 2050/2050Ti' quantity={quantities?.vga.rtx2050_2050ti || 0} />
          <FilterItem name='RTX 4050' quantity={quantities?.vga.rtx4050 || 0} />
          <FilterItem name='RTX 3050/3050Ti' quantity={quantities?.vga.rtx3050_3050ti || 0} />
          <FilterItem name='RTX 4060' quantity={quantities?.vga.rxt4060 || 0} />
        </div>
        {/* Kích thước màn hình */}
        <div>
          <Title>Kích thước màn hình</Title>
          <FilterGroupItem>
            <FilterItem name='13.3 inch' quantity={quantities?.screenSize.s_13_3inch || 0} />
            <FilterItem name='13 inch' quantity={quantities?.screenSize.s_13inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='13.5 inch' quantity={quantities?.screenSize.s_13_5inch || 0} />
            <FilterItem name='13.6 inch' quantity={quantities?.screenSize.s_13_6inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='13.4 inch' quantity={quantities?.screenSize.s_13_4inch || 0} />
            <FilterItem name='15.4 inch' quantity={quantities?.screenSize.s_15_4inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='14 inch' quantity={quantities?.screenSize.s_14inch || 0} />
            <FilterItem name='14.2 inch' quantity={quantities?.screenSize.s_14_2inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='15 inch' quantity={quantities?.screenSize.s_15inch || 0} />
            <FilterItem name='14.5 inch' quantity={quantities?.screenSize.s_14_5inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='15.6 inch' quantity={quantities?.screenSize.s_15_6inch || 0} />
            <FilterItem name='16 inch' quantity={quantities?.screenSize.s_16inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='16.2 inch' quantity={quantities?.screenSize.s_16_2inch || 0} />
            <FilterItem name='17 inch' quantity={quantities?.screenSize.s_17inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='16.2 inch' quantity={quantities?.screenSize.s_16_2inch || 0} />
            <FilterItem name='17 inch' quantity={quantities?.screenSize.s_17inch || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='15.3 inch' quantity={quantities?.screenSize.s_15_3inch || 0} />
            <FilterItem name='Khác' quantity={quantities?.screenSize.s_other || 0} />
          </FilterGroupItem>
        </div>
        {/* Độ phân giải màn hình */}
        <div>
          <Title>Độ phân giải màn hình</Title>
          <FilterItem name='HD (1366x768)' quantity={quantities?.screenResolution.r_HD_1366x768 || 0} />
          <FilterItem name='Full HD (1920x1080)' quantity={quantities?.screenResolution.r_Full_HD_1920x1080 || 0} />
          <FilterItem name='WUXGA (1920 x 1200)' quantity={quantities?.screenResolution.r_WUXGA_1920x1200 || 0} />
          <FilterItem name='WQHD (2560x1440)' quantity={quantities?.screenResolution.r_WQHD_2560x1440 || 0} />
          <FilterItem name='WQXGA (2560x1600)' quantity={quantities?.screenResolution.r_WQXGA_2560x1600 || 0} />
          <FilterItem
            name='Pixel Sense (2736 x 1824)'
            quantity={quantities?.screenResolution.r_Pixel_Sense_2736x1824 || 0}
          />
          <FilterItem name='2.8K (2880x1800)' quantity={quantities?.screenResolution.r_2_8K_2880x1800 || 0} />
          <FilterItem name='Retina (2560 x 1600)' quantity={quantities?.screenResolution.r_Retina_2560x1600 || 0} />
          <FilterItem name='Retina (2560 x 1664)' quantity={quantities?.screenResolution.r_Retina_2560x1664 || 0} />
          <FilterItem name='4K (3840x2160)' quantity={quantities?.screenResolution.r_4K_3840x2160 || 0} />
          <FilterItem name='3k (3200 x 2000)' quantity={quantities?.screenResolution.r_3k_3200x2000 || 0} />
          <FilterItem name='Retina (2880x1864)' quantity={quantities?.screenResolution.r_Retina_2880x1864 || 0} />
          <FilterItem name='Khác' quantity={quantities?.screenResolution.r_other || 0} />
        </div>
        {/* Cảm ứng màn hình */}
        <div>
          <Title>Cảm ứng màn hình</Title>
          <FilterItem name='Có cảm ứng' quantity={quantities?.touchScreen.t_yes || 0} />
          <FilterItem name='Không cảm ứng' quantity={quantities?.touchScreen.t_no || 0} />
        </div>
        {/* Tần số màn hình */}
        <div>
          <Title>Tần số màn hình</Title>
          <FilterGroupItem>
            <FilterItem name='60 Hz' quantity={quantities?.screenFrequency.f_60Hz || 0} />
            <FilterItem name='90 Hz' quantity={quantities?.screenFrequency.f_90Hz || 0} />
          </FilterGroupItem>
          <FilterGroupItem>
            <FilterItem name='120 Hz' quantity={quantities?.screenFrequency.f_120Hz || 0} />
            <FilterItem name='165 Hz' quantity={quantities?.screenFrequency.f_165Hz || 0} />
          </FilterGroupItem>
        </div>
        {/* Hệ điều hành */}
        <div>
          <Title>Hệ điều hành</Title>
          <FilterItem name='Windows' quantity={quantities?.operationSystem.os_windows || 0} />
          <FilterItem name='Linux' quantity={quantities?.operationSystem.os_linux || 0} />
          <FilterItem name='Dos' quantity={quantities?.operationSystem.os_dos || 0} />
          <FilterItem name='Mac OS' quantity={quantities?.operationSystem.os_macos || 0} />
          <FilterItem name='Ubuntu' quantity={quantities?.operationSystem.os_ubuntu || 0} />
        </div>
      </div>
    </div>
  )
}
