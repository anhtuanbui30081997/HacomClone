import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import categoriesApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import { ChevronDoubleRightIcon } from 'src/assets/icons'
import { CategoryType } from 'src/constants/category.enum'
import {
  Brand,
  Color,
  Cpu,
  LaptopCategory,
  OperationSystem,
  Ram,
  ScreenFrequency,
  ScreenResolution,
  SizeScreen,
  Style,
  TouchScreen,
  Vga
} from 'src/types/product.type'
import { toSlug } from 'src/utils/utils'
import FilterGroupItem from '../FilterGroupItem'
import FilterItem from '../FilterItem'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const Title = (props: { children: React.ReactNode }) => {
  return <div className='border-b border-[#d9d9d9] py-3 text-sm font-bold uppercase'>{props.children}</div>
}

export default function SideBar(props: { category: CategoryType; queryConfig: QueryConfig }) {
  const navigate = useNavigate()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [style, setStyle] = useState<Style | null>(null)
  const [color, setColor] = useState<Color | null>(null)
  const [laptopCategory, setLaptopCategory] = useState<LaptopCategory | null>(null)
  const [cpu, setCpu] = useState<Cpu | null>(null)
  const [ram, setRam] = useState<Ram | null>(null)
  const [vga, setVga] = useState<Vga | null>(null)
  const [sizeScreen, setSizeScreen] = useState<SizeScreen | null>(null)
  const [screenResolution, setScreenResolution] = useState<ScreenResolution | null>(null)
  const [touchScreen, setTouchScreen] = useState<TouchScreen | null>(null)
  const [screenFrequency, setScreenFrequency] = useState<ScreenFrequency | null>(null)
  const [operationSystem, setOperationSystem] = useState<OperationSystem | null>(null)

  const { data: dataNestedCategorisList } = useQuery({
    queryKey: ['categories', props.category],
    queryFn: () => categoriesApi.getNestedCategories(props.category)
  })
  const nestedCategories = dataNestedCategorisList?.data.data
  const { data: dataQuantity } = useQuery({
    queryKey: ['quantity', props.queryConfig],
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
  const handleStyleChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Thời trang':
          setStyle('fashion')
          break
        case 'Gaming':
          setStyle('gaming')
          break
        case 'Công nghệ':
          setStyle('technology')
          break
        case 'Thường':
          setStyle('common')
          break
      }
    } else {
      setStyle(null)
    }
  }
  const handleColorChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Đen':
          setColor('black')
          break
        case 'Xám':
          setColor('gray')
          break
        case 'Bạc':
          setColor('sliver')
          break
        case 'Trắng':
          setColor('white')
          break
        case 'Hồng':
          setColor('pink')
          break
        case 'Vàng':
          setColor('gold')
          break
        case 'Xanh':
          setColor('blue')
          break
      }
    } else {
      setColor(null)
    }
  }
  const handleLaptopCategory = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Laptop Gaming':
          setLaptopCategory('laptopGaming')
          break
        case 'Đồ họa, Kiến trúc':
          setLaptopCategory('doHoaKienTruc')
          break
        case 'Phổ thông, Văn phòng':
          setLaptopCategory('phoThongVanPhong')
          break
        case 'Mỏng nhẹ, Thời trang':
          setLaptopCategory('mongNheThoiTrang')
          break
        case 'Doanh nhân':
          setLaptopCategory('doanhNhan')
          break
      }
    } else {
      setLaptopCategory(null)
    }
  }
  const handleCpuChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Intel Celeron/Pentium':
          setCpu('intelCeleronPentium')
          break
        case 'Intel Core i3':
          setCpu('intelCorei3')
          break
        case 'Intel Core i5':
          setCpu('intelCorei5')
          break
        case 'Intel Core i7':
          setCpu('intelCorei7')
          break
        case 'Intel Core i9':
          setCpu('intelCorei9')
          break
        case 'AMD Ryzen 3':
          setCpu('amdRyzen3')
          break
        case 'AMD Ryzen 5':
          setCpu('amdRyzen5')
          break
        case 'AMD Ryzen 7':
          setCpu('amdRyzen7')
          break
        case 'Apple M1':
          setCpu('appleM1')
          break
        case 'Apple M2':
          setCpu('appleM2')
          break
        case 'Apple M3':
          setCpu('appleM3')
          break
      }
    } else {
      setCpu(null)
    }
  }
  const handleRamChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case '4GB':
          setRam('4GB')
          break
        case '8GB':
          setRam('8GB')
          break
        case '16GB':
          setRam('16GB')
          break
        case '32GB':
          setRam('32GB')
          break
        case '>32GB':
          setRam('>32GB')
          break
      }
    } else {
      setRam(null)
    }
  }
  const handleVgaChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'VGA NVIDIA':
          setVga('vgaNvidia')
          break
        case 'VGA AMD':
          setVga('vgaAmd')
          break
        case 'VGA Tích hợp (Onboard)':
          setVga('vagTichHop')
          break
        case 'RTX 2050/2050Ti':
          setVga('rtx2050/2050ti')
          break
        case 'RTX 4050':
          setVga('rtx4050')
          break
        case 'RTX 3050/3050Ti':
          setVga('rtx3050/3050ti')
          break
        case 'RTX 4060':
          setVga('rxt4060')
          break
      }
    } else {
      setVga(null)
    }
  }
  const handleSizeScreenChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case '13.3 inch':
          setSizeScreen('13.3inch')
          break
        case '13 inch':
          setSizeScreen('13inch')
          break
        case '13.5 inch':
          setSizeScreen('13.5inch')
          break
        case '13.6 inch':
          setSizeScreen('13.6inch')
          break
        case '13.4 inch':
          setSizeScreen('13.4inch')
          break
        case '15.4 inch':
          setSizeScreen('15.4inch')
          break
        case '14 inch':
          setSizeScreen('14inch')
          break
        case '14.2 inch':
          setSizeScreen('14.2inch')
          break
        case '15 inch':
          setSizeScreen('15inch')
          break
        case '14.5 inch':
          setSizeScreen('14.5inch')
          break
        case '15.6 inch':
          setSizeScreen('15.6inch')
          break
        case '16 inch':
          setSizeScreen('16inch')
          break
        case '16.2 inch':
          setSizeScreen('16.2inch')
          break
        case '17 inch':
          setSizeScreen('17inch')
          break
        case '15.3 inch':
          setSizeScreen('15.3inch')
          break
        case 'Khác':
          setSizeScreen('other')
          break
      }
    } else {
      setSizeScreen(null)
    }
  }
  const handleScreenResolutionChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'HD (1366x768)':
          setScreenResolution('HD (1366x768)')
          break
        case 'Full HD (1920x1080)':
          setScreenResolution('Full HD (1920x1080)')
          break
        case 'WUXGA (1920 x 1200)':
          setScreenResolution('WUXGA (1920 x 1200)')
          break
        case 'WQHD (2560x1440)':
          setScreenResolution('WQHD (2560x1440)')
          break
        case 'WQXGA (2560x1600)':
          setScreenResolution('WQXGA (2560x1600)')
          break
        case 'Pixel Sense (2736 x 1824)':
          setScreenResolution('Pixel Sense (2736 x 1824)')
          break
        case '2.8K (2880x1800)':
          setScreenResolution('2.8K (2880x1800)')
          break
        case 'Retina (2560 x 1600)':
          setScreenResolution('Retina (2560 x 1600)')
          break
        case 'Retina (2560 x 1664)':
          setScreenResolution('Retina (2560 x 1664)')
          break
        case '4K (3840x2160)':
          setScreenResolution('4K (3840x2160)')
          break
        case '3k (3200 x 2000)':
          setScreenResolution('3k (3200 x 2000)')
          break
        case 'Retina (2880x1864)':
          setScreenResolution('Retina (2880x1864)')
          break
        case 'Khác':
          setScreenResolution('other')
          break
      }
    } else {
      setScreenResolution(null)
    }
  }
  const handleTouchScreenChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Có cảm ứng':
          setTouchScreen('yes')
          break
        case 'Không cảm ứng':
          setTouchScreen('no')
          break
      }
    } else {
      setTouchScreen(null)
    }
  }
  const handleScreenFrequencyChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case '60 Hz':
          setScreenFrequency('60Hz')
          break
        case '90 Hz':
          setScreenFrequency('90Hz')
          break
        case '120 Hz':
          setScreenFrequency('120Hz')
          break
        case '165 Hz':
          setScreenFrequency('165Hz')
          break
      }
    } else {
      setScreenFrequency(null)
    }
  }
  const handleOperationSystemChange = (name: any, checked: boolean) => {
    if (checked) {
      switch (name) {
        case 'Windows':
          setOperationSystem('Windows')
          break
        case 'Linux':
          setOperationSystem('Linux')
          break
        case 'Dos':
          setOperationSystem('Dos')
          break
        case 'Mac OS':
          setOperationSystem('MacOS')
          break
        case 'Ubuntu':
          setOperationSystem('Ubuntu')
          break
      }
    } else {
      setOperationSystem(null)
    }
  }

  useEffect(() => {
    const queryConfig = {
      ...props.queryConfig
    }
    brand ? (queryConfig.brand = brand) : delete queryConfig.brand
    style ? (queryConfig.style = style) : delete queryConfig.style
    color ? (queryConfig.color = color) : delete queryConfig.color
    laptopCategory ? (queryConfig.laptop_category = laptopCategory) : delete queryConfig.laptop_category
    cpu ? (queryConfig.cpu = cpu) : delete queryConfig.cpu
    ram ? (queryConfig.ram = ram) : delete queryConfig.ram
    vga ? (queryConfig.vga = vga) : delete queryConfig.vga
    sizeScreen ? (queryConfig.size_screen = sizeScreen) : delete queryConfig.size_screen
    screenResolution ? (queryConfig.screen_resolution = screenResolution) : delete queryConfig.screen_resolution
    touchScreen ? (queryConfig.touch_screen = touchScreen) : delete queryConfig.touch_screen
    screenFrequency ? (queryConfig.screen_frequency = screenFrequency) : delete queryConfig.screen_frequency
    operationSystem ? (queryConfig.operation_system = operationSystem) : delete queryConfig.operation_system

    navigate({
      pathname: undefined,
      search: createSearchParams(queryConfig).toString()
    })
  }, [
    brand,
    style,
    color,
    laptopCategory,
    cpu,
    ram,
    vga,
    sizeScreen,
    screenResolution,
    touchScreen,
    screenFrequency,
    operationSystem
  ])

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
          {brand === null && (
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
          {style === null && (
            <div>
              <FilterGroupItem>
                <FilterItem name='Thời trang' quantity={quantities?.style.fashion || 0} onChange={handleStyleChange} />
                <FilterItem name='Gaming' quantity={quantities?.style.gaming || 0} onChange={handleStyleChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='Công nghệ'
                  quantity={quantities?.style.technology || 0}
                  onChange={handleStyleChange}
                />
                <FilterItem name='Thường' quantity={quantities?.style.common || 0} onChange={handleStyleChange} />
              </FilterGroupItem>
            </div>
          )}
          {style === 'fashion' && (
            <FilterItem
              name='Thời trang'
              quantity={quantities?.style.fashion || 0}
              onChange={handleStyleChange}
              checked={true}
            />
          )}
          {style === 'gaming' && (
            <FilterItem
              name='Gaming'
              quantity={quantities?.style.gaming || 0}
              onChange={handleStyleChange}
              checked={true}
            />
          )}
          {style === 'technology' && (
            <FilterItem
              name='Công nghệ'
              quantity={quantities?.style.technology || 0}
              onChange={handleStyleChange}
              checked={true}
            />
          )}
          {style === 'common' && (
            <FilterItem
              name='Thường'
              quantity={quantities?.style.common || 0}
              onChange={handleStyleChange}
              checked={true}
            />
          )}
        </div>
        {/* Màu sắc */}
        <div>
          <Title>Màu sắc</Title>
          {color === null && (
            <div>
              <FilterGroupItem>
                <FilterItem name='Đen' quantity={quantities?.color.black || 0} onChange={handleColorChange} />
                <FilterItem name='Xám' quantity={quantities?.color.gray || 0} onChange={handleColorChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='Bạc' quantity={quantities?.color.sliver || 0} onChange={handleColorChange} />
                <FilterItem name='Trắng' quantity={quantities?.color.white || 0} onChange={handleColorChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='Hồng' quantity={quantities?.color.pink || 0} onChange={handleColorChange} />
                <FilterItem name='Vàng' quantity={quantities?.color.gold || 0} onChange={handleColorChange} />
              </FilterGroupItem>
              <FilterItem name='Xanh' quantity={quantities?.color.blue || 0} onChange={handleColorChange} />
            </div>
          )}
          {color === 'black' && (
            <FilterItem
              name='Đen'
              quantity={quantities?.color.black || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
          {color === 'gray' && (
            <FilterItem name='Xám' quantity={quantities?.color.gray || 0} onChange={handleColorChange} checked={true} />
          )}
          {color === 'sliver' && (
            <FilterItem
              name='Bạc'
              quantity={quantities?.color.sliver || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
          {color === 'white' && (
            <FilterItem
              name='Trắng'
              quantity={quantities?.color.white || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
          {color === 'pink' && (
            <FilterItem
              name='Hồng'
              quantity={quantities?.color.pink || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
          {color === 'gold' && (
            <FilterItem
              name='Vàng'
              quantity={quantities?.color.gold || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
          {color === 'blue' && (
            <FilterItem
              name='Xanh'
              quantity={quantities?.color.blue || 0}
              onChange={handleColorChange}
              checked={true}
            />
          )}
        </div>
        {/* Phân loại LAPTOP */}
        <div>
          <Title>Phân loại LAPTOP</Title>
          {laptopCategory === null && (
            <div>
              <FilterItem
                name='Laptop Gaming'
                quantity={quantities?.laptopCategory.laptopGaming || 0}
                onChange={handleLaptopCategory}
              />
              <FilterItem
                name='Đồ họa, Kiến trúc'
                quantity={quantities?.laptopCategory.doHoaKienTruc || 0}
                onChange={handleLaptopCategory}
              />
              <FilterItem
                name='Phổ thông, Văn phòng'
                quantity={quantities?.laptopCategory.phoThongVanPhong || 0}
                onChange={handleLaptopCategory}
              />
              <FilterItem
                name='Mỏng nhẹ, Thời trang'
                quantity={quantities?.laptopCategory.mongNheThoiTrang || 0}
                onChange={handleLaptopCategory}
              />
              <FilterItem
                name='Doanh nhân'
                quantity={quantities?.laptopCategory.doanhNhan || 0}
                onChange={handleLaptopCategory}
              />
            </div>
          )}
          {laptopCategory === 'doHoaKienTruc' && (
            <FilterItem
              name='Đồ họa, Kiến trúc'
              quantity={quantities?.laptopCategory.doHoaKienTruc || 0}
              onChange={handleLaptopCategory}
              checked={true}
            />
          )}
          {laptopCategory === 'doanhNhan' && (
            <FilterItem
              name='Doanh nhân'
              quantity={quantities?.laptopCategory.doanhNhan || 0}
              onChange={handleLaptopCategory}
              checked={true}
            />
          )}
          {laptopCategory === 'laptopGaming' && (
            <FilterItem
              name='Laptop Gaming'
              quantity={quantities?.laptopCategory.laptopGaming || 0}
              onChange={handleLaptopCategory}
              checked={true}
            />
          )}
          {laptopCategory === 'mongNheThoiTrang' && (
            <FilterItem
              name='Mỏng nhẹ, Thời trang'
              quantity={quantities?.laptopCategory.mongNheThoiTrang || 0}
              onChange={handleLaptopCategory}
              checked={true}
            />
          )}
          {laptopCategory === 'phoThongVanPhong' && (
            <FilterItem
              name='Phổ thông, Văn phòng'
              quantity={quantities?.laptopCategory.phoThongVanPhong || 0}
              onChange={handleLaptopCategory}
              checked={true}
            />
          )}
        </div>
        {/* CPU */}
        <div>
          <Title>CPU</Title>
          {cpu === null && (
            <div>
              <FilterItem
                name='Intel Celeron/Pentium'
                quantity={quantities?.cpu.intelCeleronPentium || 0}
                onChange={handleCpuChange}
              />
              <FilterItem name='Intel Core i3' quantity={quantities?.cpu.intelCorei3 || 0} onChange={handleCpuChange} />
              <FilterItem name='Intel Core i5' quantity={quantities?.cpu.intelCorei5 || 0} onChange={handleCpuChange} />
              <FilterItem name='Intel Core i7' quantity={quantities?.cpu.intelCorei7 || 0} onChange={handleCpuChange} />
              <FilterItem name='Intel Core i9' quantity={quantities?.cpu.intelCorei9 || 0} onChange={handleCpuChange} />
              <FilterItem name='AMD Ryzen 3' quantity={quantities?.cpu.amdRyzen3 || 0} onChange={handleCpuChange} />
              <FilterItem name='AMD Ryzen 5' quantity={quantities?.cpu.amdRyzen5 || 0} onChange={handleCpuChange} />
              <FilterItem name='AMD Ryzen 7' quantity={quantities?.cpu.amdRyzen7 || 0} onChange={handleCpuChange} />
              <FilterItem name='Apple M1' quantity={quantities?.cpu.appleM1 || 0} onChange={handleCpuChange} />
              <FilterItem name='Apple M2' quantity={quantities?.cpu.appleM2 || 0} onChange={handleCpuChange} />
              <FilterItem name='Apple M3' quantity={quantities?.cpu.appleM3 || 0} onChange={handleCpuChange} />
            </div>
          )}
          {cpu === 'intelCeleronPentium' && (
            <FilterItem
              name='Intel Celeron/Pentium'
              quantity={quantities?.cpu.intelCeleronPentium || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'intelCorei3' && (
            <FilterItem
              name='Intel Core i3'
              quantity={quantities?.cpu.intelCorei3 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'intelCorei5' && (
            <FilterItem
              name='Intel Core i5'
              quantity={quantities?.cpu.intelCorei5 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'intelCorei7' && (
            <FilterItem
              name='Intel Core i7'
              quantity={quantities?.cpu.intelCorei7 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'intelCorei9' && (
            <FilterItem
              name='Intel Core i9'
              quantity={quantities?.cpu.intelCorei9 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'amdRyzen3' && (
            <FilterItem
              name='AMD Ryzen 3'
              quantity={quantities?.cpu.amdRyzen3 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'amdRyzen5' && (
            <FilterItem
              name='AMD Ryzen 5'
              quantity={quantities?.cpu.amdRyzen5 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'amdRyzen7' && (
            <FilterItem
              name='AMD Ryzen 7'
              quantity={quantities?.cpu.amdRyzen7 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'appleM1' && (
            <FilterItem
              name='Apple M1'
              quantity={quantities?.cpu.appleM1 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'appleM2' && (
            <FilterItem
              name='Apple M2'
              quantity={quantities?.cpu.appleM2 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
          {cpu === 'appleM3' && (
            <FilterItem
              name='Apple M3'
              quantity={quantities?.cpu.appleM3 || 0}
              onChange={handleCpuChange}
              checked={true}
            />
          )}
        </div>
        {/* RAM */}
        <div>
          <Title>RAM</Title>
          {ram === null && (
            <div>
              <FilterGroupItem>
                <FilterItem name='4GB' quantity={quantities?.ram.ram_4GB || 0} onChange={handleRamChange} />
                <FilterItem name='8GB' quantity={quantities?.ram.ram_8GB || 0} onChange={handleRamChange} />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem name='16GB' quantity={quantities?.ram.ram_16GB || 0} onChange={handleRamChange} />
                <FilterItem name='32GB' quantity={quantities?.ram.ram_32GB || 0} onChange={handleRamChange} />
              </FilterGroupItem>
              <FilterItem name='>32GB' quantity={quantities?.ram.ram_gt_32GB || 0} onChange={handleRamChange} />
            </div>
          )}
          {ram === '4GB' && (
            <FilterItem name='4GB' quantity={quantities?.ram.ram_4GB || 0} onChange={handleRamChange} checked={true} />
          )}
          {ram === '8GB' && (
            <FilterItem name='8GB' quantity={quantities?.ram.ram_8GB || 0} onChange={handleRamChange} checked={true} />
          )}
          {ram === '16GB' && (
            <FilterItem
              name='16GB'
              quantity={quantities?.ram.ram_16GB || 0}
              onChange={handleRamChange}
              checked={true}
            />
          )}
          {ram === '32GB' && (
            <FilterItem
              name='32GB'
              quantity={quantities?.ram.ram_32GB || 0}
              onChange={handleRamChange}
              checked={true}
            />
          )}
          {ram === '>32GB' && (
            <FilterItem
              name='>32GB'
              quantity={quantities?.ram.ram_gt_32GB || 0}
              onChange={handleRamChange}
              checked={true}
            />
          )}
        </div>
        {/* VGA - Card màn hình */}
        <div>
          <Title>VGA - Card màn hình</Title>
          {vga === null && (
            <div>
              <FilterItem name='VGA NVIDIA' quantity={quantities?.vga.vgaNvidia || 0} onChange={handleVgaChange} />
              <FilterItem name='VGA AMD' quantity={quantities?.vga.vgaAmd || 0} onChange={handleVgaChange} />
              <FilterItem
                name='VGA Tích hợp (Onboard)'
                quantity={quantities?.vga.vagTichHop || 0}
                onChange={handleVgaChange}
              />
              <FilterItem
                name='RTX 2050/2050Ti'
                quantity={quantities?.vga.rtx2050_2050ti || 0}
                onChange={handleVgaChange}
              />
              <FilterItem name='RTX 4050' quantity={quantities?.vga.rtx4050 || 0} onChange={handleVgaChange} />
              <FilterItem
                name='RTX 3050/3050Ti'
                quantity={quantities?.vga.rtx3050_3050ti || 0}
                onChange={handleVgaChange}
              />
              <FilterItem name='RTX 4060' quantity={quantities?.vga.rxt4060 || 0} onChange={handleVgaChange} />
            </div>
          )}
          {vga === 'rtx2050/2050ti' && (
            <FilterItem
              name='RTX 2050/2050Ti'
              quantity={quantities?.vga.rtx2050_2050ti || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'rtx3050/3050ti' && (
            <FilterItem
              name='RTX 3050/3050Ti'
              quantity={quantities?.vga.rtx3050_3050ti || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'rtx4050' && (
            <FilterItem
              name='RTX 4050'
              quantity={quantities?.vga.rtx4050 || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'rxt4060' && (
            <FilterItem
              name='RTX 4060'
              quantity={quantities?.vga.rxt4060 || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'vagTichHop' && (
            <FilterItem
              name='VGA Tích hợp (Onboard)'
              quantity={quantities?.vga.vagTichHop || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'vgaAmd' && (
            <FilterItem
              name='VGA AMD'
              quantity={quantities?.vga.vgaAmd || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
          {vga === 'vgaNvidia' && (
            <FilterItem
              name='VGA NVIDIA'
              quantity={quantities?.vga.vgaNvidia || 0}
              onChange={handleVgaChange}
              checked={true}
            />
          )}
        </div>
        {/* Kích thước màn hình */}
        <div>
          <Title>Kích thước màn hình</Title>
          {sizeScreen === null && (
            <div>
              <FilterGroupItem>
                <FilterItem
                  name='13.3 inch'
                  quantity={quantities?.screenSize.s_13_3inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='13 inch'
                  quantity={quantities?.screenSize.s_13inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='13.5 inch'
                  quantity={quantities?.screenSize.s_13_5inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='13.6 inch'
                  quantity={quantities?.screenSize.s_13_6inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='13.4 inch'
                  quantity={quantities?.screenSize.s_13_4inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='15.4 inch'
                  quantity={quantities?.screenSize.s_15_4inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='14 inch'
                  quantity={quantities?.screenSize.s_14inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='14.2 inch'
                  quantity={quantities?.screenSize.s_14_2inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='15 inch'
                  quantity={quantities?.screenSize.s_15inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='14.5 inch'
                  quantity={quantities?.screenSize.s_14_5inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='15.6 inch'
                  quantity={quantities?.screenSize.s_15_6inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='16 inch'
                  quantity={quantities?.screenSize.s_16inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='16.2 inch'
                  quantity={quantities?.screenSize.s_16_2inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='17 inch'
                  quantity={quantities?.screenSize.s_17inch || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='15.3 inch'
                  quantity={quantities?.screenSize.s_15_3inch || 0}
                  onChange={handleSizeScreenChange}
                />
                <FilterItem
                  name='Khác'
                  quantity={quantities?.screenSize.s_other || 0}
                  onChange={handleSizeScreenChange}
                />
              </FilterGroupItem>
            </div>
          )}
          {sizeScreen === '13.3inch' && (
            <FilterItem
              name='13.3 inch'
              quantity={quantities?.screenSize.s_13_3inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '13inch' && (
            <FilterItem
              name='13 inch'
              quantity={quantities?.screenSize.s_13inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '13.5inch' && (
            <FilterItem
              name='13.5 inch'
              quantity={quantities?.screenSize.s_13_5inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '13.6inch' && (
            <FilterItem
              name='13.6 inch'
              quantity={quantities?.screenSize.s_13_6inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '13.4inch' && (
            <FilterItem
              name='13.4 inch'
              quantity={quantities?.screenSize.s_13_4inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '15.4inch' && (
            <FilterItem
              name='15.4 inch'
              quantity={quantities?.screenSize.s_15_4inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '14inch' && (
            <FilterItem
              name='14 inch'
              quantity={quantities?.screenSize.s_14inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '14.2inch' && (
            <FilterItem
              name='14.2 inch'
              quantity={quantities?.screenSize.s_14_2inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '15inch' && (
            <FilterItem
              name='15 inch'
              quantity={quantities?.screenSize.s_15inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '14.5inch' && (
            <FilterItem
              name='14.5 inch'
              quantity={quantities?.screenSize.s_14_5inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '15.6inch' && (
            <FilterItem
              name='15.6 inch'
              quantity={quantities?.screenSize.s_15_6inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '16inch' && (
            <FilterItem
              name='16 inch'
              quantity={quantities?.screenSize.s_16inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '16.2inch' && (
            <FilterItem
              name='16.2 inch'
              quantity={quantities?.screenSize.s_16_2inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '17inch' && (
            <FilterItem
              name='17 inch'
              quantity={quantities?.screenSize.s_17inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === '15.3inch' && (
            <FilterItem
              name='15.3 inch'
              quantity={quantities?.screenSize.s_15_3inch || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
          {sizeScreen === 'other' && (
            <FilterItem
              name='Khác'
              quantity={quantities?.screenSize.s_other || 0}
              checked={true}
              onChange={handleSizeScreenChange}
            />
          )}
        </div>
        {/* Độ phân giải màn hình */}
        <div>
          <Title>Độ phân giải màn hình</Title>
          {screenResolution === null && (
            <div>
              <FilterItem
                name='HD (1366x768)'
                quantity={quantities?.screenResolution.r_HD_1366x768 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Full HD (1920x1080)'
                quantity={quantities?.screenResolution.r_Full_HD_1920x1080 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='WUXGA (1920 x 1200)'
                quantity={quantities?.screenResolution.r_WUXGA_1920x1200 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='WQHD (2560x1440)'
                quantity={quantities?.screenResolution.r_WQHD_2560x1440 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='WQXGA (2560x1600)'
                quantity={quantities?.screenResolution.r_WQXGA_2560x1600 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Pixel Sense (2736 x 1824)'
                quantity={quantities?.screenResolution.r_Pixel_Sense_2736x1824 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='2.8K (2880x1800)'
                quantity={quantities?.screenResolution.r_2_8K_2880x1800 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Retina (2560 x 1600)'
                quantity={quantities?.screenResolution.r_Retina_2560x1600 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Retina (2560 x 1664)'
                quantity={quantities?.screenResolution.r_Retina_2560x1664 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='4K (3840x2160)'
                quantity={quantities?.screenResolution.r_4K_3840x2160 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='3k (3200 x 2000)'
                quantity={quantities?.screenResolution.r_3k_3200x2000 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Retina (2880x1864)'
                quantity={quantities?.screenResolution.r_Retina_2880x1864 || 0}
                onChange={handleScreenResolutionChange}
              />
              <FilterItem
                name='Khác'
                quantity={quantities?.screenResolution.r_other || 0}
                onChange={handleScreenResolutionChange}
              />
            </div>
          )}

          {screenResolution === 'HD (1366x768)' && (
            <FilterItem
              name='HD (1366x768)'
              quantity={quantities?.screenResolution.r_HD_1366x768 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'Full HD (1920x1080)' && (
            <FilterItem
              name='Full HD (1920x1080)'
              quantity={quantities?.screenResolution.r_Full_HD_1920x1080 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'WUXGA (1920 x 1200)' && (
            <FilterItem
              name='WUXGA (1920 x 1200)'
              quantity={quantities?.screenResolution.r_WUXGA_1920x1200 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'WQHD (2560x1440)' && (
            <FilterItem
              name='WQHD (2560x1440)'
              quantity={quantities?.screenResolution.r_WQHD_2560x1440 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'WQXGA (2560x1600)' && (
            <FilterItem
              name='WQXGA (2560x1600)'
              quantity={quantities?.screenResolution.r_WQXGA_2560x1600 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'Pixel Sense (2736 x 1824)' && (
            <FilterItem
              name='Pixel Sense (2736 x 1824)'
              quantity={quantities?.screenResolution.r_Pixel_Sense_2736x1824 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === '2.8K (2880x1800)' && (
            <FilterItem
              name='2.8K (2880x1800)'
              quantity={quantities?.screenResolution.r_2_8K_2880x1800 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'Retina (2560 x 1600)' && (
            <FilterItem
              name='Retina (2560 x 1600)'
              quantity={quantities?.screenResolution.r_Retina_2560x1600 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'Retina (2560 x 1664)' && (
            <FilterItem
              name='Retina (2560 x 1664)'
              quantity={quantities?.screenResolution.r_Retina_2560x1664 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === '4K (3840x2160)' && (
            <FilterItem
              name='4K (3840x2160)'
              quantity={quantities?.screenResolution.r_4K_3840x2160 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === '3k (3200 x 2000)' && (
            <FilterItem
              name='3k (3200 x 2000)'
              quantity={quantities?.screenResolution.r_3k_3200x2000 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'Retina (2560 x 1600)' && (
            <FilterItem
              name='Retina (2880x1864)'
              quantity={quantities?.screenResolution.r_Retina_2880x1864 || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
          {screenResolution === 'other' && (
            <FilterItem
              name='Khác'
              quantity={quantities?.screenResolution.r_other || 0}
              onChange={handleScreenResolutionChange}
              checked={true}
            />
          )}
        </div>
        {/* Cảm ứng màn hình */}
        <div>
          <Title>Cảm ứng màn hình</Title>
          {touchScreen === null && (
            <div>
              <FilterItem
                name='Có cảm ứng'
                quantity={quantities?.touchScreen.t_yes || 0}
                onChange={handleTouchScreenChange}
              />
              <FilterItem
                name='Không cảm ứng'
                quantity={quantities?.touchScreen.t_no || 0}
                onChange={handleTouchScreenChange}
              />
            </div>
          )}
          {touchScreen === 'yes' && (
            <FilterItem
              name='Có cảm ứng'
              quantity={quantities?.touchScreen.t_yes || 0}
              onChange={handleTouchScreenChange}
              checked={true}
            />
          )}
          {touchScreen === 'no' && (
            <FilterItem
              name='Không cảm ứng'
              quantity={quantities?.touchScreen.t_no || 0}
              onChange={handleTouchScreenChange}
              checked={true}
            />
          )}
        </div>
        {/* Tần số màn hình */}
        <div>
          <Title>Tần số màn hình</Title>
          {screenFrequency === null && (
            <div>
              <FilterGroupItem>
                <FilterItem
                  name='60 Hz'
                  quantity={quantities?.screenFrequency.f_60Hz || 0}
                  onChange={handleScreenFrequencyChange}
                />
                <FilterItem
                  name='90 Hz'
                  quantity={quantities?.screenFrequency.f_90Hz || 0}
                  onChange={handleScreenFrequencyChange}
                />
              </FilterGroupItem>
              <FilterGroupItem>
                <FilterItem
                  name='120 Hz'
                  quantity={quantities?.screenFrequency.f_120Hz || 0}
                  onChange={handleScreenFrequencyChange}
                />
                <FilterItem
                  name='165 Hz'
                  quantity={quantities?.screenFrequency.f_165Hz || 0}
                  onChange={handleScreenFrequencyChange}
                />
              </FilterGroupItem>
            </div>
          )}
          {screenFrequency === '60Hz' && (
            <FilterItem
              name='60 Hz'
              quantity={quantities?.screenFrequency.f_60Hz || 0}
              onChange={handleScreenFrequencyChange}
              checked={true}
            />
          )}
          {screenFrequency === '90Hz' && (
            <FilterItem
              name='90 Hz'
              quantity={quantities?.screenFrequency.f_90Hz || 0}
              onChange={handleScreenFrequencyChange}
              checked={true}
            />
          )}
          {screenFrequency === '120Hz' && (
            <FilterItem
              name='120 Hz'
              quantity={quantities?.screenFrequency.f_120Hz || 0}
              onChange={handleScreenFrequencyChange}
              checked={true}
            />
          )}
          {screenFrequency === '165Hz' && (
            <FilterItem
              name='165 Hz'
              quantity={quantities?.screenFrequency.f_165Hz || 0}
              onChange={handleScreenFrequencyChange}
              checked={true}
            />
          )}
        </div>
        {/* Hệ điều hành */}
        <div>
          <Title>Hệ điều hành</Title>
          {operationSystem === null && (
            <div>
              <FilterItem
                name='Windows'
                quantity={quantities?.operationSystem.os_windows || 0}
                onChange={handleOperationSystemChange}
              />
              <FilterItem
                name='Linux'
                quantity={quantities?.operationSystem.os_linux || 0}
                onChange={handleOperationSystemChange}
              />
              <FilterItem
                name='Dos'
                quantity={quantities?.operationSystem.os_dos || 0}
                onChange={handleOperationSystemChange}
              />
              <FilterItem
                name='Mac OS'
                quantity={quantities?.operationSystem.os_macos || 0}
                onChange={handleOperationSystemChange}
              />
              <FilterItem
                name='Ubuntu'
                quantity={quantities?.operationSystem.os_ubuntu || 0}
                onChange={handleOperationSystemChange}
              />
            </div>
          )}
          {operationSystem === 'Windows' && (
            <FilterItem
              name='Windows'
              quantity={quantities?.operationSystem.os_windows || 0}
              onChange={handleOperationSystemChange}
              checked={true}
            />
          )}
          {operationSystem === 'Linux' && (
            <FilterItem
              name='Linux'
              quantity={quantities?.operationSystem.os_linux || 0}
              onChange={handleOperationSystemChange}
              checked={true}
            />
          )}
          {operationSystem === 'Dos' && (
            <FilterItem
              name='Dos'
              quantity={quantities?.operationSystem.os_dos || 0}
              onChange={handleOperationSystemChange}
              checked={true}
            />
          )}
          {operationSystem === 'MacOS' && (
            <FilterItem
              name='Mac OS'
              quantity={quantities?.operationSystem.os_macos || 0}
              onChange={handleOperationSystemChange}
              checked={true}
            />
          )}
          {operationSystem === 'Ubuntu' && (
            <FilterItem
              name='Ubuntu'
              quantity={quantities?.operationSystem.os_ubuntu || 0}
              onChange={handleOperationSystemChange}
              checked={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}
