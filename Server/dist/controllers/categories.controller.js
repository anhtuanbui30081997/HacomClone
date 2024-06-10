"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const category_service_1 = __importDefault(require("../services/category.service"));
class CategoryController {
    async createCategory(req, res, next) {
        const data = await category_service_1.default.createCategory(req.body);
        return res.status(httpStatus_1.default.CREATED).json({
            message: messages_1.CATEGORY_MESSAGES.CREATE_CATEGORY_SUCCESSFULLY,
            data
        });
    }
    async getCategories(req, res, next) {
        const { category } = req.params;
        const data = await category_service_1.default.getCategories(Number(category));
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
            data
        });
    }
    async getAllCategories(req, res, next) {
        const { category } = req.params;
        const data = await category_service_1.default.getAllCategories(Number(category));
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
            data
        });
    }
    async getAllParentCategories(req, res, next) {
        const { category } = req.params;
        const data = await category_service_1.default.getAllParentCategories(Number(category));
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.CATEGORY_MESSAGES.GET_CATEGORY_SUCCESSFULLY,
            data
        });
    }
}
const categoriesController = new CategoryController();
exports.default = categoriesController;
