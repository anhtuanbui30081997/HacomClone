"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controller_1 = __importDefault(require("~/controllers/medias.controller"));
const staticRouter = (0, express_1.Router)();
staticRouter.get('/image/:name', medias_controller_1.default.serveImageController);
const staticRoute = {
    path: '/static',
    router: staticRouter
};
exports.default = staticRoute;
