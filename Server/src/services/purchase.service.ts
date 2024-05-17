import { Purchase } from '~/models/schemas/Purchase.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'

class PurchaseService {
  async addToCart({ buy_count, product_id }: { product_id: string; buy_count: number }) {
    const purchase = await databaseService.purchases.insertOne(
      new Purchase({
        buy_count: buy_count,
        product_id: new ObjectId(product_id),
        purchase_status: -1
      })
    )
    return purchase
  }
}

const purchaseService = new PurchaseService()
export default purchaseService
