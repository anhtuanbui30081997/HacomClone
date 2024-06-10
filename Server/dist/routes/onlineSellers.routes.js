"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onlineSellers_controller_1 = __importDefault(require("../controllers/onlineSellers.controller"));
const handlers_1 = require("../utils/handlers");
const onlineSellerRouter = (0, express_1.Router)();
/**
 * Description. Get All Online Sellers
 * Method: Get
 * Path: '/'
 * Body: None
 */
onlineSellerRouter.get('/', (0, handlers_1.wrapRequestHandler)(onlineSellers_controller_1.default.getAllOnlineSellers));
const onlineSellerRoute = {
    path: '/online-sellers',
    router: onlineSellerRouter
};
exports.default = onlineSellerRoute;
