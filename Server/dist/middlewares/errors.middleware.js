"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const lodash_1 = require("lodash");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Errors_1 = require("../models/Errors");
const defaultErrorHandler = (err, req, res, next) => {
    try {
        if (err instanceof Errors_1.ErrorWithStatus) {
            // Logger.error(`[ERROR] - Status: ${err.status} - Message: ${err.message}`)
            console.log(`[ERROR] - Status: ${err.status} - Message: ${err.message}`);
            return res.status(err.status).json((0, lodash_1.omit)(err, ['status']));
        }
    }
    catch (error) {
        // Logger.error(`[ERROR] - Status: ${HTTP_STATUS.INTERNAL_SERVER_ERROR} - Message: Internal server error`)
        console.log(`[ERROR] - Status: ${httpStatus_1.default.INTERNAL_SERVER_ERROR} - Message: Internal server error`);
        return res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error',
            errorInfo: (0, lodash_1.omit)(error, 'stack')
        });
    }
};
exports.defaultErrorHandler = defaultErrorHandler;
