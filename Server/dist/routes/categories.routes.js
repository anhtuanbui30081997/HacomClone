"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = __importDefault(require("~/controllers/categories.controller"));
const categories_middleware_1 = require("~/middlewares/categories.middleware");
const handlers_1 = require("~/utils/handlers");
const categoriesRouter = (0, express_1.Router)();
/**
 * Description.  Create new category
 * Path: /create-category
 * Method: POST
 * Body: CategoryRequestBody
 */
categoriesRouter.post('/create-category', categories_middleware_1.categoryValidator, (0, handlers_1.wrapRequestHandler)(categories_controller_1.default.createCategory));
/**
 * Description.  Get Nested Categories
 * Path: /
 * Method: GET
 * Body: CategoryRequestBody
 */
categoriesRouter.get('/:category', categories_middleware_1.categoryTypeValidator, (0, handlers_1.wrapRequestHandler)(categories_controller_1.default.getCategories));
/**
 * Description.  Get all child categories
 * Path: /
 * Method: POST
 * Body: CategoryRequestBody
 */
categoriesRouter.get('/all-categories/:category', categories_middleware_1.categoryTypeValidator, (0, handlers_1.wrapRequestHandler)(categories_controller_1.default.getAllCategories));
categoriesRouter.get('/all-parent-categories/:category', categories_middleware_1.categoryTypeValidator, (0, handlers_1.wrapRequestHandler)(categories_controller_1.default.getAllParentCategories));
const categoriesRoute = {
    path: '/categories',
    router: categoriesRouter
};
exports.default = categoriesRoute;
