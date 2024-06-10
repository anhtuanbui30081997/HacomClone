"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    async addProduct(req, res, next) {
        const product = req.body;
        const { insertedId } = await product_service_1.default.addProduct(product, req);
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.ADD_PRODUCT_SUCCESSFULLY,
            data: insertedId
        });
    }
    async uploadImagesProduct(req, res, next) {
        const url = await product_service_1.default.uploadImagesProduct(req);
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.UPLOAD_PRODUCT_IMAGES_SUCCESSFULLY,
            data: url
        });
    }
    async getProductList(req, res, next) {
        const { limit, page } = req.query;
        const { productList, total, productListSize } = await product_service_1.default.getProductList(req.query);
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.GET_PRODUCT_LIST_SUCCESSFULLY,
            data: {
                products: productList,
                page: Number(page),
                limit: Number(limit),
                total: total,
                page_size: Math.ceil(productListSize / Number(limit))
            }
        });
    }
    async getProductDetail(req, res, next) {
        const { id } = req.params;
        const product = await await product_service_1.default.getProductDetail(id);
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.GET_PRODUCT_DETAIL_SUCCESSFULLY,
            data: product
        });
    }
    async getQuantity(req, res, next) {
        const { brand, style, color, laptopCategory, cpu, ram, vga, screenSize, screenResolution, operationSystem, screenFrequency, touchScreen } = await product_service_1.default.getQuantity();
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.GET_QUANTITY_SUCCESSFULLY,
            data: {
                brand,
                style,
                color,
                laptopCategory,
                cpu,
                ram,
                vga,
                screenSize,
                screenResolution,
                operationSystem,
                touchScreen,
                screenFrequency
            }
        });
    }
    async searchProduct(req, res, next) {
        const { name } = req.params;
        const productList = await product_service_1.default.searchProduct(name);
        return res.json({
            message: messages_1.PRODUCT_MESSAGES.SEARHC_PRODUCT_SUCCESSFULLY,
            data: productList
        });
    }
}
const productController = new ProductController();
exports.default = productController;
