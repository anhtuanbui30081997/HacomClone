"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const onlineSeller_service_1 = __importDefault(require("../services/onlineSeller.service"));
class OnlineSellersController {
    async getAllOnlineSellers(req, res, next) {
        const onlineSellers = await onlineSeller_service_1.default.getAllOnlineSeller();
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.ONLINE_SELLER_MESSAGES.GET_ALL_ONLINE_SELLERS_SUCCESSFULLY,
            data: onlineSellers
        });
    }
}
const onlineSellerController = new OnlineSellersController();
exports.default = onlineSellerController;
