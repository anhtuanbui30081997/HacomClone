"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchases_controller_1 = __importDefault(require("~/controllers/purchases.controller"));
const purchases_middleware_1 = require("~/middlewares/purchases.middleware");
const users_middleware_1 = require("~/middlewares/users.middleware");
const handlers_1 = require("~/utils/handlers");
const purchaseRouter = (0, express_1.Router)();
purchaseRouter.post('/add-to-cart', users_middleware_1.accessTokenValidator, purchases_middleware_1.addToCartValidator, (0, handlers_1.wrapRequestHandler)(purchases_controller_1.default.addToCart));
purchaseRouter.get('/:purchase_status', users_middleware_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(purchases_controller_1.default.getPurchases));
purchaseRouter.put('/', users_middleware_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(purchases_controller_1.default.updatePurchase));
purchaseRouter.delete('/:product_id', users_middleware_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(purchases_controller_1.default.deletePurchase));
purchaseRouter.delete('/', users_middleware_1.accessTokenValidator, purchases_controller_1.default.deleteAllPurchaseInCart);
const purchaseRoute = {
    path: '/purchases',
    router: purchaseRouter
};
exports.default = purchaseRoute;
