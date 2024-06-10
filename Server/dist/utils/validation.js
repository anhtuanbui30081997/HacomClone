"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const Errors_1 = require("~/models/Errors");
const httpStatus_1 = __importDefault(require("~/constants/httpStatus"));
const validate = (validation) => {
    return async (req, res, next) => {
        await validation.run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        // If no Error => Next to continue request
        if (errors.isEmpty()) {
            return next();
        }
        const errorsObject = errors.mapped();
        const entityError = new Errors_1.EntityError({ errors: {} });
        for (const key in errorsObject) {
            const { msg } = errorsObject[key];
            /**
             * If error is ErrorWithStatus, msg like:
             * msg: { message: 'test ty thoi', status: 400 }
             * {
                email: {
                    type: 'field',
                    value: 'buituananh1@gmail.com',
                    msg: ErrorWithStatus { message: 'test ty thoi', status: 400 },
                    path: 'email',
                    location: 'body'
                  }
                }
                so return next(msg)
             */
            if (msg instanceof Errors_1.ErrorWithStatus && msg.status !== httpStatus_1.default.UNPROCESSABLE_ENTITY) {
                return next(msg);
            }
            entityError.errors[key] = errorsObject[key];
        }
        // If has error => Next(error) to defaultErrorHandler
        next(entityError);
    };
};
exports.validate = validate;
