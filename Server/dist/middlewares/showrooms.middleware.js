"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionValidator = void 0;
const express_validator_1 = require("express-validator");
const enums_1 = require("~/constants/enums");
const messages_1 = require("~/constants/messages");
const common_1 = require("~/utils/common");
const validation_1 = require("~/utils/validation");
const regionTypes = (0, common_1.numberEnumToArray)(enums_1.RegionType);
exports.regionValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    region: {
        isNumeric: {
            errorMessage: messages_1.SHOWROOM_MESSAGES.REGION_MUST_BE_A_NUMBER
        },
        isIn: {
            options: [regionTypes],
            errorMessage: messages_1.SHOWROOM_MESSAGES.REGION_IS_INCORRECT
        }
    }
}, ['params']));
