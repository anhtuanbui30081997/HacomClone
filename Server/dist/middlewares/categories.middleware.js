"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryTypeValidator = exports.categoryValidator = void 0;
const express_validator_1 = require("express-validator");
const enums_1 = require("../constants/enums");
const messages_1 = require("../constants/messages");
const common_1 = require("../utils/common");
const validation_1 = require("../utils/validation");
const categoryType = (0, common_1.numberEnumToArray)(enums_1.CategoryType);
const categorySchema = {
    isNumeric: {
        errorMessage: messages_1.CATEGORY_MESSAGES.CATEGORY_MUST_BE_A_NUMBER
    },
    isIn: {
        options: [categoryType],
        errorMessage: messages_1.CATEGORY_MESSAGES.CATEGORY_UNKNOW
    }
};
exports.categoryValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    name: {
        isString: {
            errorMessage: messages_1.CATEGORY_MESSAGES.CATEGORY_NAME_MUST_BE_A_STRING
        },
        trim: true
    },
    category: categorySchema,
    parent_category: categorySchema
}, ['body']));
exports.categoryTypeValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    category: categorySchema
}, ['params']));
