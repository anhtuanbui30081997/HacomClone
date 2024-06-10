"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenAdminValidator = exports.updatePasswordValidator = exports.forgotPasswordRequestValidator = exports.refreshTokenValidator = exports.accessTokenValidator = exports.LoginAdminValidator = exports.LoginValidator = exports.RegisterValidator = void 0;
const express_validator_1 = require("express-validator");
const httpStatus_1 = __importDefault(require("~/constants/httpStatus"));
const messages_1 = require("~/constants/messages");
const Errors_1 = require("~/models/Errors");
const database_service_1 = __importDefault(require("~/services/database.service"));
const user_service_1 = __importDefault(require("~/services/user.service"));
const validation_1 = require("~/utils/validation");
const crypto_1 = require("~/utils/crypto");
const jwt_1 = require("~/utils/jwt");
const lodash_1 = require("lodash");
const enums_1 = require("~/constants/enums");
const passwordSchema = {
    isString: {
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_A_STRING
    },
    isStrongPassword: {
        options: {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1
        },
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRONG
    }
};
exports.RegisterValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: messages_1.USER_MESSAGES.USER_NAME_IS_REQUIRED
        },
        isString: {
            errorMessage: messages_1.USER_MESSAGES.USER_NAME_MUST_BE_A_STRING
        },
        isLength: {
            options: {
                min: 1,
                max: 100
            },
            errorMessage: messages_1.USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100_CHARACTERS
        },
        trim: true
    },
    email: {
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, req) => {
                const isExistEmail = await user_service_1.default.checkEmailExist(value);
                if (isExistEmail) {
                    throw new Error(messages_1.USER_MESSAGES.EMAIL_ALREADY_EXISTS);
                }
                return true;
            }
        }
    },
    password: passwordSchema
}, ['body']));
exports.LoginValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const email = value;
                const user = await database_service_1.default.users.findOne({
                    email
                });
                if (!user) {
                    // Can not find this user
                    throw new Error(messages_1.USER_MESSAGES.EMAIL_IS_INCORRECT);
                }
                return true;
            }
        }
    },
    password: {
        ...passwordSchema,
        custom: {
            options: async (value, { req }) => {
                const email = req.body.email;
                const password = value;
                const user = await database_service_1.default.users.findOne({
                    email,
                    password: (0, crypto_1.hashPassword)(password)
                }, {
                    projection: {
                        password: 0
                    }
                });
                if (!user) {
                    // Can not find this user
                    throw new Error(messages_1.USER_MESSAGES.PASSWORD_IS_INCORRECT);
                }
                ;
                req.user = user;
                return true;
            }
        }
    }
}));
exports.LoginAdminValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const email = value;
                const user = await database_service_1.default.users.findOne({
                    email
                });
                if (!user) {
                    // Can not find this user
                    throw new Error(messages_1.USER_MESSAGES.EMAIL_IS_INCORRECT);
                }
                if (user.role !== enums_1.RoleType.Admin) {
                    throw new Error(messages_1.USER_MESSAGES.USER_IS_NOT_ADMIN);
                }
                return true;
            }
        }
    },
    password: {
        ...passwordSchema,
        custom: {
            options: async (value, { req }) => {
                const email = req.body.email;
                const password = value;
                const user = await database_service_1.default.users.findOne({
                    email,
                    password: (0, crypto_1.hashPassword)(password)
                }, {
                    projection: {
                        password: 0
                    }
                });
                if (!user) {
                    // Can not find this user
                    throw new Error(messages_1.USER_MESSAGES.PASSWORD_IS_INCORRECT);
                }
                ;
                req.user = user;
                return true;
            }
        }
    }
}));
exports.accessTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
                    });
                }
                try {
                    const decoded_access_token = await (0, jwt_1.verifyToken)({
                        secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN,
                        token: access_token
                    });
                    req.decoded_access_token = decoded_access_token;
                    return true;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: (0, lodash_1.capitalize)(error.message)
                    });
                }
            }
        }
    }
}, ['headers']));
exports.refreshTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    refresh_token: {
        isString: {
            errorMessage: messages_1.USER_MESSAGES.REFRESH_TOKEN_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                try {
                    const decoded_refresh_token = await (0, jwt_1.verifyToken)({
                        secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN,
                        token: value
                    });
                    req.decoded_refresh_token = decoded_refresh_token;
                    return true;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: (0, lodash_1.capitalize)(error.message)
                    });
                }
            }
        }
    }
}, ['body']));
exports.forgotPasswordRequestValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, req) => {
                const isExistEmail = await user_service_1.default.checkEmailExist(value);
                if (!isExistEmail) {
                    throw new Error(messages_1.USER_MESSAGES.EMAIL_IS_NOT_REGISTERED);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updatePasswordValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    forgot_password_token: {
        isString: {
            errorMessage: messages_1.USER_MESSAGES.FORGOT_PASSWORD_TOKEN_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                try {
                    const decodeed_forgot_password_token = await (0, jwt_1.verifyToken)({
                        secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
                        token: value
                    });
                    req.decodeed_forgot_password_token = decodeed_forgot_password_token;
                    return true;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: (0, lodash_1.capitalize)(error.message)
                    });
                }
            }
        }
    },
    new_password: passwordSchema
}, ['body']));
exports.accessTokenAdminValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
                    });
                }
                try {
                    const decoded_access_token = await (0, jwt_1.verifyToken)({
                        secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN,
                        token: access_token
                    });
                    if (decoded_access_token.role !== enums_1.RoleType.Admin) {
                        throw new Errors_1.ErrorWithStatus({
                            status: httpStatus_1.default.UNAUTHORIZED,
                            message: messages_1.USER_MESSAGES.YOU_ARE_NOT_AN_ADMIN
                        });
                    }
                    ;
                    req.decoded_access_token = decoded_access_token;
                    return true;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: (0, lodash_1.capitalize)(error.message)
                    });
                }
            }
        }
    }
}, ['headers']));
