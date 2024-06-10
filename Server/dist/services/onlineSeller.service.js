"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("~/constants/enums");
const database_service_1 = __importDefault(require("./database.service"));
class OnlineSellerService {
    async getAllOnlineSeller() {
        const onlineSellers = await database_service_1.default.onlineSellers
            .find({
            $or: [{ seller_type: enums_1.SellerType.Personal }, { seller_type: enums_1.SellerType.Interprise }]
        })
            .toArray();
        return onlineSellers;
    }
}
const onlineService = new OnlineSellerService();
exports.default = onlineService;
