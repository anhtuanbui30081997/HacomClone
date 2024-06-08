import { Purchase, PurchaseStatusType } from '~/models/schemas/Purchase.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'

class PurchaseService {
  async addToCart({ buy_count, product_id, user_id }: { product_id: string; buy_count: number; user_id: string }) {
    const purchase = await databaseService.purchases.findOneAndUpdate(
      {
        product_id: new ObjectId(product_id),
        user_id: new ObjectId(user_id)
      },
      {
        $inc: {
          buy_count: buy_count
        }
      },
      {
        returnDocument: 'after'
      }
    )
    if (purchase) return purchase
    await databaseService.purchases.insertOne(
      new Purchase({
        buy_count: buy_count,
        product_id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
        purchase_status: -1
      })
    )
    const newPurchase = await databaseService.purchases.findOne({
      product_id: new ObjectId(product_id),
      user_id: new ObjectId(user_id)
    })
    return newPurchase
  }

  async getPurchases(purchase_status: number, user_id: string) {
    const purchases = await databaseService.purchases
      .aggregate([
        {
          $match: {
            user_id: new ObjectId(user_id),
            purchase_status: purchase_status
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product_info'
          }
        },
        {
          $unwind: {
            path: '$product_info'
          }
        },
        {
          $project: {
            'product_info._id': 0,
            'product_info.specifications': 0,
            'product_info.guarantee': 0,
            'product_info.categories': 0,
            'product_info.showrooms': 0,
            'product_info.views': 0,
            'product_info.comments': 0,
            'product_info.rating': 0,
            'product_info.number_rating': 0,
            'product_info.group': 0
          }
        }
      ])
      .toArray()
    return purchases
  }

  async updatePurchase({ buy_count, product_id, user_id }: { product_id: string; user_id: string; buy_count: number }) {
    const purchase = await databaseService.purchases.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id)
      },
      {
        $set: {
          buy_count: buy_count
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return purchase
  }

  async deletePurchase({ product_id, user_id }: { product_id: string; user_id: string }) {
    const purchase = await databaseService.purchases.findOneAndDelete({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })

    return purchase
  }

  async deleteAllPurchaseInCart(user_id: string) {
    const purchase = await databaseService.purchases.deleteMany({
      user_id: new ObjectId(user_id),
      purchase_status: -1
    })
    return purchase
  }
}

const purchaseService = new PurchaseService()
export default purchaseService
