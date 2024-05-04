import { Request } from 'express'
import { GetProductListQuery, ProductRequestBody } from '~/models/requests/Product.requests'
import databaseService from './database.service'
import { Product } from '~/models/schemas/Product.schema'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import { Media } from '~/models/Other'
import { UPLOAD_IMAGE_DIR } from '~/constants/direction'
import path from 'path'
import fsPromise from 'fs/promises'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import sharp from 'sharp'

class ProductService {
  private async uploadImageService(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        const buffer = await sharp(file.filepath).jpeg().toBuffer()
        await fsPromise.writeFile(newPath, buffer)
        try {
          await fsPromise.unlink(file.filepath)
        } catch (error) {
          // console.log(error)
        }
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async addProduct(productReqBody: ProductRequestBody, req: Request) {
    const product = await databaseService.products.insertOne(
      new Product({
        categories: productReqBody.categories,
        guarantee: productReqBody.guarantee,
        name: productReqBody.name,
        new_price: productReqBody.new_price,
        old_price: productReqBody.old_price,
        showrooms: productReqBody.showrooms,
        specifications: productReqBody.specifications,
        images: productReqBody.images,
        product_code: productReqBody.product_code
      })
    )
    return product
  }

  async uploadImagesProduct(req: Request) {
    const url: Media[] = await this.uploadImageService(req)
    return url
  }

  async getProductList(queryParam: GetProductListQuery) {
    const {
      brand,
      category,
      limit,
      page,
      color,
      cpu,
      laptop_category,
      operation_system,
      screen_frequency,
      screen_resolution,
      size_screen,
      style,
      touch_screen
    } = queryParam
    const filter = []

    filter.push({ categories: Number(category) })
    if (brand) {
      filter.push({ 'laptop.brand': brand })
    }
    if (color) {
      filter.push({ 'laptop.color': color })
    }
    if (cpu) {
      filter.push({ 'laptop.cpu': cpu })
    }
    if (laptop_category) {
      filter.push({ 'laptop.laptop_category': laptop_category })
    }
    if (operation_system) {
      filter.push({ 'laptop.operation_system': operation_system })
    }
    if (screen_frequency) {
      filter.push({ 'laptop.screen_frequency': screen_frequency })
    }
    if (screen_resolution) {
      filter.push({ 'laptop.screen_resolution': screen_resolution })
    }
    if (size_screen) {
      filter.push({ 'laptop.size_screen': size_screen })
    }
    if (style) {
      filter.push({ 'laptop.style': style })
    }
    if (touch_screen) {
      filter.push({ 'laptop.touch_screen': touch_screen })
    }

    const [productList, total] = await Promise.all([
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $project: {
              'laptop._id': 0,
              'laptop.product_code': 0
            }
          },
          {
            $match: {
              $and: filter
            }
          },
          {
            $unset: 'group'
          },
          {
            $skip: Number(limit) * (Number(page) - 1)
          },
          {
            $limit: Number(limit)
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $project: {
              'laptop._id': 0,
              'laptop.product_code': 0
            }
          },
          {
            $match: {
              $and: filter
            }
          },
          {
            $unset: 'group'
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])

    return { productList, total: total[0].total }
  }

  async getQuantity() {
    const [
      asus,
      acer,
      dell,
      hp,
      lenovo,
      msi,
      macbook,
      lg,
      microsoft,
      vaio,
      fashion,
      gaming,
      technology,
      common,
      black,
      gray,
      sliver,
      white,
      pink,
      gold,
      blue,
      laptopGaming,
      doHoaKienTruc,
      phoThongVanPhong,
      mongNheThoiTrang,
      doanhNhan,
      intelCeleronPentium,
      intelCorei3,
      intelCorei5,
      intelCorei7,
      intelCorei9,
      amdRyzen3,
      amdRyzen5,
      amdRyzen7,
      appleM1,
      appleM2,
      appleM3,
      vgaNvidia,
      vgaAmd,
      vagTichHop,
      rtx2050_2050ti,
      rtx4050,
      rtx3050_3050ti,
      rxt4060,
      s_13_3inch,
      s_13inch,
      s_13_5inch,
      s_13_6inch,
      s_13_4inch,
      s_15_4inch,
      s_14inch,
      s_14_2inch,
      s_15inch,
      s_14_5inch,
      s_15_6inch,
      s_16inch,
      s_16_2inch,
      s_17inch,
      s_15_3inch,
      s_other,
      r_HD_1366x768,
      r_Full_HD_1920x1080,
      r_WUXGA_1920x1200,
      r_WQHD_2560x1440,
      r_WQXGA_2560x1600,
      r_Pixel_Sense_2736x1824,
      r_2_8K_2880x1800,
      r_Retina_2560x1600,
      r_Retina_2560x1664,
      r_4K_3840x2160,
      r_3k_3200x2000,
      r_Retina_2880x1864,
      r_other,
      t_yes,
      t_no,
      f_60Hz,
      f_90Hz,
      f_120Hz,
      f_165Hz,
      os_windows,
      os_linux,
      os_dos,
      os_macos,
      os_ubuntu
    ] = await Promise.all([
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'asus'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'acer'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'dell'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'hp'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'lenovo'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'msi'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'mac'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'lg'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'microsoft'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.brand': 'vaio'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.style': 'fashion'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.style': 'gaming'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.style': 'technology'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.style': 'common'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'black'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'gray'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'sliver'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'white'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'pink'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'gold'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.color': 'blue'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.laptop_category': 'laptopGaming'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.laptop_category': 'doHoaKienTruc'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.laptop_category': 'phoThongVanPhong'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.laptop_category': 'mongNheThoiTrang'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.laptop_category': 'doanhNhan'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'intelCeleronPentium'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'intelCorei3'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'intelCorei5'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'intelCorei7'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'intelCorei9'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'amdRyzen3'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'amdRyzen5'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'amdRyzen7'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'appleM1'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'appleM2'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.cpu': 'appleM3'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'vgaNvidia'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'vgaAmd'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'vagTichHop'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'rtx2050/2050ti'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'rtx4050'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'rtx3050/3050ti'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.vga': 'rxt4060'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '13.3inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '13inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '13.5inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '13.6inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '13.4inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '15.4inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '14inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '14.2inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '15inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '14.5inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '15.6inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '16inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '16.2inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '17inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': '15.3inch'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.size_screen': 'other'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'HD (1366x768)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'Full HD (1920x1080)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'WUXGA (1920 x 1200)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'WQHD (2560x1440)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'WQXGA (2560x1600)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'Pixel Sense (2736 x 1824)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': '2.8K (2880x1800)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'Retina (2560 x 1600)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'Retina (2560 x 1664)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': '4K (3840x2160)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': '3k (3200 x 2000)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'Retina (2880x1864)'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_resolution': 'other'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.touch_screen': 'yes'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.touch_screen': 'no'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_frequency': '60Hz'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_frequency': '90Hz'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_frequency': '120Hz'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.screen_frequency': '165Hz'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.operation_system': 'Windows'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.operation_system': 'Linux'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.operation_system': 'Dos'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.operation_system': 'MacOS'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray(),
      databaseService.products
        .aggregate([
          {
            $lookup: {
              from: 'laptops',
              localField: 'product_code',
              foreignField: 'product_code',
              as: 'laptop'
            }
          },
          {
            $unwind: {
              path: '$laptop'
            }
          },
          {
            $match: {
              'laptop.operation_system': 'Ubuntu'
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])

    return {
      brand: {
        asus: asus[0] ? asus[0].total : 0,
        acer: acer[0] ? acer[0].total : 0,
        dell: dell[0] ? dell[0].total : 0,
        hp: hp[0].total ? hp[0].total : 0,
        lenovo: lenovo[0] ? lenovo[0].total : 0,
        msi: msi[0] ? msi[0].total : 0,
        macbook: macbook[0] ? macbook[0].total : 0,
        lg: lg[0] ? lg[0].total : 0,
        microsoft: microsoft[0] ? microsoft[0].total : 0,
        vaio: vaio[0] ? vaio[0].total : 0
      },
      style: {
        fashion: fashion[0] ? fashion[0].total : 0,
        gaming: gaming[0] ? gaming[0].total : 0,
        technology: technology[0] ? technology[0].total : 0,
        common: common[0] ? common[0].total : 0
      },
      color: {
        black: black[0] ? black[0].total : 0,
        gray: gray[0] ? gray[0].total : 0,
        sliver: sliver[0] ? sliver[0].total : 0,
        white: white[0] ? white[0].total : 0,
        pink: pink[0] ? pink[0].total : 0,
        gold: gold[0] ? gold[0].total : 0,
        blue: blue[0] ? blue[0].total : 0
      },
      laptopCategory: {
        laptopGaming: laptopGaming[0] ? laptopGaming[0].total : 0,
        doHoaKienTruc: doHoaKienTruc[0] ? doHoaKienTruc[0].total : 0,
        phoThongVanPhong: phoThongVanPhong[0] ? phoThongVanPhong[0].total : 0,
        mongNheThoiTrang: mongNheThoiTrang[0] ? mongNheThoiTrang[0].total : 0,
        doanhNhan: doanhNhan[0] ? doanhNhan[0].total : 0
      },
      cpu: {
        intelCeleronPentium: intelCeleronPentium[0] ? intelCeleronPentium[0].total : 0,
        intelCorei3: intelCorei3[0] ? intelCorei3[0].total : 0,
        intelCorei5: intelCorei5[0] ? intelCorei5[0].total : 0,
        intelCorei7: intelCorei7[0] ? intelCorei7[0].total : 0,
        intelCorei9: intelCorei9[0] ? intelCorei9[0].total : 0,
        amdRyzen3: amdRyzen3[0] ? amdRyzen3[0].total : 0,
        amdRyzen5: amdRyzen5[0] ? amdRyzen5[0].total : 0,
        amdRyzen7: amdRyzen7[0] ? amdRyzen7[0].total : 0,
        appleM1: appleM1[0] ? appleM1[0].total : 0,
        appleM2: appleM2[0] ? appleM2[0].total : 0,
        appleM3: appleM3[0] ? appleM3[0].total : 0
      },
      vga: {
        vgaNvidia: vgaNvidia[0] ? vgaNvidia[0].total : 0,
        vgaAmd: vgaAmd[0] ? vgaAmd[0].total : 0,
        vagTichHop: vagTichHop[0] ? vagTichHop[0].total : 0,
        rtx2050_2050ti: rtx2050_2050ti[0] ? rtx2050_2050ti[0].total : 0,
        rtx4050: rtx4050[0] ? rtx4050[0].total : 0,
        rtx3050_3050ti: rtx3050_3050ti[0] ? rtx3050_3050ti[0].total : 0,
        rxt4060: rxt4060[0] ? rxt4060[0].total : 0
      },
      screenSize: {
        s_13_3inch: s_13_3inch[0] ? s_13_3inch[0].total : 0,
        s_13inch: s_13inch[0] ? s_13inch[0].total : 0,
        s_13_5inch: s_13_5inch[0] ? s_13_5inch[0].total : 0,
        s_13_6inch: s_13_6inch[0] ? s_13_6inch[0].total : 0,
        s_13_4inch: s_13_4inch[0] ? s_13_4inch[0].total : 0,
        s_15_4inch: s_15_4inch[0] ? s_15_4inch[0].total : 0,
        s_14inch: s_14inch[0] ? s_14inch[0].total : 0,
        s_14_2inch: s_14_2inch[0] ? s_14_2inch[0].total : 0,
        s_15inch: s_15inch[0] ? s_15inch[0].total : 0,
        s_14_5inch: s_14_5inch[0] ? s_14_5inch[0].total : 0,
        s_15_6inch: s_15_6inch[0] ? s_15_6inch[0].total : 0,
        s_16inch: s_16inch[0] ? s_16inch[0].total : 0,
        s_16_2inch: s_16_2inch[0] ? s_16_2inch[0].total : 0,
        s_17inch: s_17inch[0] ? s_17inch[0].total : 0,
        s_15_3inch: s_15_3inch[0] ? s_15_3inch[0].total : 0,
        s_other: s_other[0] ? s_other[0].total : 0
      },
      screenResolution: {
        r_HD_1366x768: r_HD_1366x768[0] ? r_HD_1366x768[0].total : 0,
        r_Full_HD_1920x1080: r_Full_HD_1920x1080[0] ? r_Full_HD_1920x1080[0].total : 0,
        r_WUXGA_1920x1200: r_WUXGA_1920x1200[0] ? r_WUXGA_1920x1200[0].total : 0,
        r_WQHD_2560x1440: r_WQHD_2560x1440[0] ? r_WQHD_2560x1440[0].total : 0,
        r_WQXGA_2560x1600: r_WQXGA_2560x1600[0] ? r_WQXGA_2560x1600[0].total : 0,
        r_Pixel_Sense_2736x1824: r_Pixel_Sense_2736x1824[0] ? r_Pixel_Sense_2736x1824[0].total : 0,
        r_2_8K_2880x1800: r_2_8K_2880x1800[0] ? r_2_8K_2880x1800[0].total : 0,
        r_Retina_2560x1600: r_Retina_2560x1600[0] ? r_Retina_2560x1600[0].total : 0,
        r_Retina_2560x1664: r_Retina_2560x1664[0] ? r_Retina_2560x1664[0].total : 0,
        r_4K_3840x2160: r_4K_3840x2160[0] ? r_4K_3840x2160[0].total : 0,
        r_3k_3200x2000: r_3k_3200x2000[0] ? r_3k_3200x2000[0].total : 0,
        r_Retina_2880x1864: r_Retina_2880x1864[0] ? r_Retina_2880x1864[0].total : 0,
        r_other: r_other[0] ? r_other[0].total : 0
      },
      touchScreen: {
        t_yes: t_yes[0] ? t_yes[0].total : 0,
        t_no: t_no[0] ? t_no[0].total : 0
      },
      screenFrequency: {
        f_60Hz: f_60Hz[0] ? f_60Hz[0].total : 0,
        f_90Hz: f_90Hz[0] ? f_90Hz[0].total : 0,
        f_120Hz: f_120Hz[0] ? f_120Hz[0].total : 0,
        f_165Hz: f_165Hz[0] ? f_165Hz[0].total : 0
      },
      operationSystem: {
        os_windows: os_windows[0] ? os_windows[0].total : 0,
        os_linux: os_linux[0] ? os_linux[0].total : 0,
        os_dos: os_dos[0] ? os_dos[0].total : 0,
        os_macos: os_macos[0] ? os_macos[0].total : 0,
        os_ubuntu: os_ubuntu[0] ? os_ubuntu[0].total : 0
      }
    }
  }
}

const productService = new ProductService()
export default productService
