"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const purchase_service_1 = __importDefault(require("../services/purchase.service"));
class PurchaseController {
    async addToCart(req, res, next) {
        const { buy_count, product_id } = req.body;
        const { user_id } = req.decoded_access_token;
        const purchase = await purchase_service_1.default.addToCart({
            product_id: product_id,
            buy_count: Number(buy_count),
            user_id: user_id
        });
        return res.json({
            message: messages_1.PURCHASE_MESSAGES.ADD_TO_CART_SUCCESSFULLY,
            data: purchase
        });
    }
    async getPurchases(req, res, next) {
        const { purchase_status } = req.params;
        const { user_id } = req.decoded_access_token;
        const purchases = await purchase_service_1.default.getPurchases(Number(purchase_status), user_id);
        return res.json({
            message: messages_1.PURCHASE_MESSAGES.GET_PURCHASES_SUCESSFULLY,
            data: purchases
        });
    }
    async updatePurchase(req, res, next) {
        const { product_id, buy_count } = req.body;
        const { user_id } = req.decoded_access_token;
        const purchase = await purchase_service_1.default.updatePurchase({ buy_count, product_id, user_id });
        return res.json({
            message: messages_1.PURCHASE_MESSAGES.UPDATE_PURCHASE_SUCCESSFULLY,
            data: purchase
        });
    }
    async deletePurchase(req, res, next) {
        const { product_id } = req.params;
        const { user_id } = req.decoded_access_token;
        const purchases = await purchase_service_1.default.deletePurchase({ product_id, user_id });
        return res.json({
            message: messages_1.PURCHASE_MESSAGES.DELETE_PURCHASE_SUCCESSFULLY,
            data: purchases
        });
    }
    async deleteAllPurchaseInCart(req, res, next) {
        const { user_id } = req.decoded_access_token;
        const purchases = await purchase_service_1.default.deleteAllPurchaseInCart(user_id);
        return res.json({
            message: messages_1.PURCHASE_MESSAGES.DELETE_ALL_PURCHASE_IN_CART_SUCCESSFULLY,
            data: purchases
        });
    }
}
const purchaseController = new PurchaseController();
exports.default = purchaseController;
