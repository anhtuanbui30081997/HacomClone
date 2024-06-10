"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("~/controllers/products.controller"));
const products_middleware_1 = require("~/middlewares/products.middleware");
const handlers_1 = require("~/utils/handlers");
const productRouter = (0, express_1.Router)();
productRouter.post('/', (0, handlers_1.wrapRequestHandler)(products_controller_1.default.addProduct));
productRouter.get('', (0, handlers_1.wrapRequestHandler)(products_controller_1.default.getProductList));
productRouter.get('/laptop/', (0, handlers_1.wrapRequestHandler)(products_controller_1.default.getQuantity));
productRouter.get('/:id', products_middleware_1.productIdValidator, (0, handlers_1.wrapRequestHandler)(products_controller_1.default.getProductDetail));
productRouter.post('/upload-images', (0, handlers_1.wrapRequestHandler)(products_controller_1.default.uploadImagesProduct));
productRouter.get('/search/:name', (0, handlers_1.wrapRequestHandler)(products_controller_1.default.searchProduct));
const productRoute = {
    path: '/products',
    router: productRouter
};
exports.default = productRoute;
