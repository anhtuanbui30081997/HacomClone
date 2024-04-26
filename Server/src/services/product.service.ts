import { Request } from 'express'
import { ProductRequestBody } from '~/models/requests/Product.requests'
import databaseService from './database.service'
import { Product } from '~/models/schemas/Product.schema'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import { Media } from '~/models/Other'
import { UPLOAD_IMAGE_DIR } from '~/constants/direction'
import path from 'path'
import fsPromise from 'fs/promises'
import { isProduction } from '~/constants/config'
import { CategoryType, MediaType } from '~/constants/enums'
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

  async getProductList(category: CategoryType) {
    const productList = await databaseService.products.find({ categories: { $in: [category] } })
    return productList.toArray()
  }
}

const productService = new ProductService()
export default productService
