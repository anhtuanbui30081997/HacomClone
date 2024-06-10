"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showrooms_controller_1 = __importDefault(require("../controllers/showrooms.controller"));
const showrooms_middleware_1 = require("../middlewares/showrooms.middleware");
const handlers_1 = require("../utils/handlers");
const showroomRouter = (0, express_1.Router)();
/**
 * Description. Get all showrooms
 * Method: Get
 * Path: '/
 * Body: None
 */
showroomRouter.get('/', (0, handlers_1.wrapRequestHandler)(showrooms_controller_1.default.getAllShowrooms));
/**
 * Description. Get showrooms by region
 * Method: Get
 * Path: '/region/:region'
 * Body: None
 */
showroomRouter.get('/region/:region', showrooms_middleware_1.regionValidator, (0, handlers_1.wrapRequestHandler)(showrooms_controller_1.default.getShowroomsByRegion));
const showroomRoute = {
    path: '/showrooms',
    router: showroomRouter
};
exports.default = showroomRoute;
