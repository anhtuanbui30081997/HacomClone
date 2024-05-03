import { ObjectId } from 'mongodb'
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
} from '../requests/Product.requests'

interface LaptopType {
  _id?: ObjectId
  product_code: string
  brand: Brand
  style: Style
  color: Color
  laptop_category: LaptopCategory
  cpu: Cpu
  ram: Ram
  vga: Vga
  size_screen: SizeScreen
  screen_resolution: ScreenResolution
  touch_screen: TouchScreen
  screen_frequency: ScreenFrequency
  operation_system: OperationSystem
}

export class Laptop {
  _id?: ObjectId
  product_code: string
  brand: Brand
  style: Style
  color: Color
  laptop_category: LaptopCategory
  cpu: Cpu
  ram: Ram
  vga: Vga
  size_screen: SizeScreen
  screen_resolution: ScreenResolution
  touch_screen: TouchScreen
  screen_frequency: ScreenFrequency
  operation_system: OperationSystem
  constructor(laptop: LaptopType) {
    this._id = laptop._id || new ObjectId()
    this.product_code = laptop.product_code
    this.brand = laptop.brand
    this.style = laptop.style
    this.color = laptop.color
    this.laptop_category = laptop.laptop_category
    this.cpu = laptop.cpu
    this.ram = laptop.ram
    this.vga = laptop.vga
    this.size_screen = laptop.size_screen
    this.screen_resolution = laptop.screen_resolution
    this.touch_screen = laptop.touch_screen
    this.screen_frequency = laptop.screen_frequency
    this.operation_system = laptop.operation_system
  }
}
