"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdValidator = void 0;
const express_validator_1 = require("express-validator");
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const database_service_1 = __importDefault(require("../services/database.service"));
const validation_1 = require("../utils/validation");
exports.productIdValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    id: {
        isString: {
            errorMessage: messages_1.PRODUCT_MESSAGES.PRODUCT_ID_MUST_BE_A_STRING
        },
        custom: {
            options: async (value, { req }) => {
                try {
                    const product = await database_service_1.default.products.findOne({
                        _id: new mongodb_1.ObjectId(value)
                    });
                    if (product === null) {
                        throw new Error(messages_1.PRODUCT_MESSAGES.PRODUCT_NOT_EXISTED);
                    }
                    return true;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.NOT_FOUND,
                        message: (0, lodash_1.capitalize)(error.message)
                    });
                }
            }
        }
    }
}, ['params']));
