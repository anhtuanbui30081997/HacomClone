import { Purchase, PurchaseStatusType } from '~/models/schemas/Purchase.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'

class PurchaseService {
  async addToCart({ buy_count, product_id, user_id }: { product_id: string; buy_count: number; user_id: string }) {
    const purchase = await databaseService.purchases.findOneAndUpdate({
      product_id: new ObjectId(product_id),
      user_id: new ObjectId(user_id)
    }, {
      $inc: {
      buy_count: buy_count
      }
    },
    {
      returnDocument: 'after'
    })
    if (purchase) return purchase
    await databaseService.purchases.insertOne(
      new Purchase({
        buy_count: buy_count,
        product_id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
        purchase_status: -1
    }))
    const newPurchase = await databaseService.purchases.findOne({
      product_id: new ObjectId(product_id),
      user_id: new ObjectId(user_id)
    })
    return newPurchase
  }

  async getPurchases(purchase_status: number, user_id: string) {
    const purchases = await databaseService.purchases.find({
      user_id: new ObjectId(user_id),
      purchase_status: purchase_status as PurchaseStatusType
    }).toArray()
    return purchases
  } 
}

const purchaseService = new PurchaseService()
export default purchaseService
