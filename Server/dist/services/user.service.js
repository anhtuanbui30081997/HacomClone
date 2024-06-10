"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./database.service"));
const User_schema_1 = require("../models/schemas/User.schema");
const crypto_1 = require("../utils/crypto");
const enums_1 = require("../constants/enums");
const jwt_1 = require("../utils/jwt");
const mongodb_1 = require("mongodb");
const RefreshToken_schema_1 = require("../models/schemas/RefreshToken.schema");
const Errors_1 = require("../models/Errors");
const messages_1 = require("../constants/messages");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
class UserService {
    signAccessToken({ user_id, role }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenType.AccessToken,
                role
            },
            privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        });
    }
    signRefreshToken({ user_id, exp, role }) {
        if (exp) {
            return (0, jwt_1.signToken)({
                payload: {
                    user_id,
                    role,
                    token_type: enums_1.TokenType.RefreshToken,
                    exp
                },
                privateKey: process.env.JWT_SECRET_REFRESH_TOKEN
            });
        }
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                role,
                token_type: enums_1.TokenType.RefreshToken
            },
            privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
            options: {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
            }
        });
    }
    signForgotPasswordToken(user_id) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenType.ForgotPasswordToken
            },
            privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
            options: {
                expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
            }
        });
    }
    signAccessTokenAndRefreshToken({ user_id, exp, role }) {
        return Promise.all([this.signAccessToken({ user_id, role }), this.signRefreshToken({ user_id, exp, role })]);
    }
    decodeRefreshToken(refresh_token) {
        return (0, jwt_1.verifyToken)({ token: refresh_token, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN });
    }
    async checkEmailExist(email) {
        const user = await database_service_1.default.users.findOne({ email });
        return Boolean(user);
    }
    async register({ email, name, password }) {
        const user_id = new mongodb_1.ObjectId();
        await database_service_1.default.users.insertOne(new User_schema_1.User({
            _id: user_id,
            email,
            name,
            role: enums_1.RoleType.User,
            password: (0, crypto_1.hashPassword)(password)
        }));
        const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
            user_id: user_id.toString(),
            role: enums_1.RoleType.User
        });
        const { iat, exp } = await this.decodeRefreshToken(refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.RefreshToken({
            user_id,
            token: refresh_token,
            exp,
            iat
        }));
        return {
            access_token,
            refresh_token
        };
    }
    async login(user_id) {
        const old_refresh_token = await database_service_1.default.refreshTokens.findOne({
            user_id: new mongodb_1.ObjectId(user_id)
        });
        if (old_refresh_token) {
            const { exp, iat } = await this.decodeRefreshToken(old_refresh_token.token);
            const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
                user_id,
                exp,
                role: enums_1.RoleType.User
            });
            // Update new refresh_token into database
            await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.RefreshToken({
                user_id: new mongodb_1.ObjectId(user_id),
                token: refresh_token,
                exp,
                iat
            }));
            return {
                access_token,
                refresh_token
            };
        }
    }
    async loginAdmin(user_id) {
        const old_refresh_token = await database_service_1.default.refreshTokens.findOne({
            user_id: new mongodb_1.ObjectId(user_id)
        });
        if (old_refresh_token) {
            const { exp, iat } = await this.decodeRefreshToken(old_refresh_token.token);
            const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
                user_id,
                exp,
                role: enums_1.RoleType.Admin
            });
            // Update new refresh_token into database
            await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.RefreshToken({
                user_id: new mongodb_1.ObjectId(user_id),
                token: refresh_token,
                exp,
                iat
            }));
            return {
                access_token,
                refresh_token
            };
        }
    }
    async logout({ user_id, refresh_token }) {
        // Delete refresh_token in database
        const result = await database_service_1.default.refreshTokens.findOneAndDelete({
            user_id: new mongodb_1.ObjectId(user_id),
            token: refresh_token
        }, {
            projection: {
                token: 0
            }
        });
        return result;
    }
    async refreshToken({ user_id, refresh_token }) {
        const { exp, iat, role } = await this.decodeRefreshToken(refresh_token);
        const [access_token, new_refresh_token] = await this.signAccessTokenAndRefreshToken({
            user_id,
            exp,
            role
        });
        // Update new refresh_token into database
        await database_service_1.default.refreshTokens.findOneAndUpdate({
            user_id: new mongodb_1.ObjectId(user_id),
            token: refresh_token
        }, {
            $set: {
                token: new_refresh_token,
                iat: new Date(iat * 1000)
            },
            $currentDate: {
                updated_at: true
            }
        });
        return {
            access_token,
            refresh_token: new_refresh_token
        };
    }
    async forgotTokenRequest(email) {
        const user = await database_service_1.default.users.findOne({
            email
        });
        const forgot_password_token = await this.signForgotPasswordToken(user._id.toString());
        /** Not implement yet */
        // send a email contain forgot_password_token to this email. When user click to forgot_password_token link,
        // Client will send forgot_password_token, and new_password to Server. Server will verify forgot_password_token.
        // If forgot_password_token valid, server will update new password to database
        return { forgot_password_token };
    }
    async updatePassword({ user_id, password }) {
        const user = await database_service_1.default.users.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(user_id)
        }, {
            $set: {
                password: (0, crypto_1.hashPassword)(password)
            },
            $currentDate: {
                updated_at: true
            }
        }, {
            projection: {
                password: 0
            },
            returnDocument: 'after'
        });
        return user;
    }
    async getAllUsers() {
        const users = await database_service_1.default.users
            .find({}, {
            projection: {
                password: 0
            }
        })
            .toArray();
        return users;
    }
    async deleteOneUsers({ email }) {
        // Delete this user and database ralated to this user
        const result = await database_service_1.default.users.findOneAndDelete({ email: email }, {
            projection: {
                password: 0
            }
        });
        if (!result) {
            throw new Errors_1.ErrorWithStatus({
                status: httpStatus_1.default.NOT_FOUND,
                message: messages_1.USER_MESSAGES.EMAIL_IS_NOT_FOUNDED
            });
        }
        return result;
    }
}
const userService = new UserService();
exports.default = userService;
