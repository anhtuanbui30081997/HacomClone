"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Purchase_schema_1 = require("~/models/schemas/Purchase.schema");
const database_service_1 = __importDefault(require("./database.service"));
const mongodb_1 = require("mongodb");
class PurchaseService {
    async addToCart({ buy_count, product_id, user_id }) {
        const purchase = await database_service_1.default.purchases.findOneAndUpdate({
            product_id: new mongodb_1.ObjectId(product_id),
            user_id: new mongodb_1.ObjectId(user_id)
        }, {
            $inc: {
                buy_count: buy_count
            }
        }, {
            returnDocument: 'after'
        });
        if (purchase)
            return purchase;
        await database_service_1.default.purchases.insertOne(new Purchase_schema_1.Purchase({
            buy_count: buy_count,
            product_id: new mongodb_1.ObjectId(product_id),
            user_id: new mongodb_1.ObjectId(user_id),
            purchase_status: -1
        }));
        const newPurchase = await database_service_1.default.purchases.findOne({
            product_id: new mongodb_1.ObjectId(product_id),
            user_id: new mongodb_1.ObjectId(user_id)
        });
        return newPurchase;
    }
    async getPurchases(purchase_status, user_id) {
        const purchases = await database_service_1.default.purchases
            .aggregate([
            {
                $match: {
                    user_id: new mongodb_1.ObjectId(user_id),
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
            .toArray();
        return purchases;
    }
    async updatePurchase({ buy_count, product_id, user_id }) {
        const purchase = await database_service_1.default.purchases.findOneAndUpdate({
            user_id: new mongodb_1.ObjectId(user_id),
            product_id: new mongodb_1.ObjectId(product_id)
        }, {
            $set: {
                buy_count: buy_count
            }
        }, {
            returnDocument: 'after'
        });
        return purchase;
    }
    async deletePurchase({ product_id, user_id }) {
        const purchase = await database_service_1.default.purchases.findOneAndDelete({
            user_id: new mongodb_1.ObjectId(user_id),
            product_id: new mongodb_1.ObjectId(product_id)
        });
        return purchase;
    }
    async deleteAllPurchaseInCart(user_id) {
        const purchase = await database_service_1.default.purchases.deleteMany({
            user_id: new mongodb_1.ObjectId(user_id),
            purchase_status: -1
        });
        return purchase;
    }
}
const purchaseService = new PurchaseService();
exports.default = purchaseService;
