import { Request } from 'express'
import { PurchaseRequestBody } from '~/models/requests/Purchase.requests'
import databaseService from './database.service'
import { Purchase } from '~/models/schemas/Purchase.schema'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import { Media } from '~/models/Other'
import { UPLOAD_IMAGE_DIR } from '~/constants/direction'
import path from 'path'
import fsPromise from 'fs/promises'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import sharp from 'sharp'

class PurchaseService {
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

  async addPurchase(purchaseBody: PurchaseRequestBody, req: Request) {
    const purchase = await databaseService.purchases.insertOne(
      new Purchase({
        categories: purchaseBody.categories,
        guarantee: purchaseBody.guarantee,
        name: purchaseBody.name,
        new_price: purchaseBody.new_price,
        old_price: purchaseBody.old_price,
        showrooms: purchaseBody.showrooms,
        specifications: purchaseBody.specifications,
        images: purchaseBody.images,
        product_code: purchaseBody.product_code
      })
    )
    return purchase
  }

  async uploadImagesPurchase(req: Request) {
    const url: Media[] = await this.uploadImageService(req)
    return url
  }
}

const purchaseService = new PurchaseService()
export default purchaseService
