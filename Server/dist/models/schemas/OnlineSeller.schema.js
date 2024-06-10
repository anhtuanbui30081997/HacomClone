"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineSeller = void 0;
class OnlineSeller {
    constructor(onlineSeller) {
        this._id = onlineSeller._id;
        this.email = onlineSeller.email;
        this.name = onlineSeller.name;
        this.phone_number = onlineSeller.phone_number;
        this.seller_type = onlineSeller.seller_type;
    }
}
exports.OnlineSeller = OnlineSeller;
