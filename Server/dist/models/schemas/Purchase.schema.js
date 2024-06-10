"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongodb_1 = require("mongodb");
class Purchase {
    constructor(purchase) {
        this._id = purchase._id || new mongodb_1.ObjectId();
        this.buy_count = purchase.buy_count;
        this.product_id = purchase.product_id;
        this.user_id = purchase.user_id;
        this.purchase_status = purchase.purchase_status;
    }
}
exports.Purchase = Purchase;
