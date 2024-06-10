"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("~/constants/messages");
const user_service_1 = __importDefault(require("~/services/user.service"));
class UserController {
    async register(req, res, next) {
        const result = await user_service_1.default.register(req.body);
        return res.json({
            message: messages_1.USER_MESSAGES.REGISTER_SUCCESSFULLY,
            data: result
        });
    }
    async login(req, res, next) {
        const user_id = req.user._id;
        const result = await user_service_1.default.login(user_id.toString());
        return res.json({
            message: messages_1.USER_MESSAGES.LOGIN_SUCCESSFULLY,
            data: {
                ...result,
                user: req.user
            }
        });
    }
    async loginAdmin(req, res, next) {
        const user_id = req.user._id;
        const result = await user_service_1.default.loginAdmin(user_id.toString());
        return res.json({
            message: messages_1.USER_MESSAGES.LOGIN_SUCCESSFULLY,
            data: {
                ...result,
                user: req.user
            }
        });
    }
    async logout(req, res, next) {
        const { user_id } = req.decoded_refresh_token;
        const refresh_token = req.body.refresh_token;
        const result = await user_service_1.default.logout({ user_id, refresh_token });
        return res.json({
            message: messages_1.USER_MESSAGES.LOGOUT_SUCCESSFULLY,
            data: result
        });
    }
    async refreshToken(req, res, next) {
        const { user_id } = req.decoded_refresh_token;
        const refresh_token = req.body.refresh_token;
        const result = await user_service_1.default.refreshToken({ user_id, refresh_token });
        return res.json({
            message: messages_1.USER_MESSAGES.REFRESH_TOKEN_SUCCESSFULLY,
            data: result
        });
    }
    async forgotTokenRequest(req, res, next) {
        const email = req.body.email;
        const forgotPasswordToken = await user_service_1.default.forgotTokenRequest(email);
        return res.json({
            message: messages_1.USER_MESSAGES.FORGOT_PASSWORD_REQUEST_SUCCESSFULLY,
            data: forgotPasswordToken
        });
    }
    async updatePassword(req, res, next) {
        const { new_password } = req.body;
        const { user_id } = req.decodeed_forgot_password_token;
        const user = await user_service_1.default.updatePassword({ user_id, password: new_password });
        return res.json({
            message: messages_1.USER_MESSAGES.UPDATE_PASSWORD_SUCCESSFULLY,
            data: user
        });
    }
    async getAllUsers(req, res, next) {
        const users = await user_service_1.default.getAllUsers();
        return res.json({
            message: messages_1.USER_MESSAGES.GET_ALL_USERS_SUCCESSFULLY,
            data: users
        });
    }
    async deleteOneUser(req, res, next) {
        const email = req.body.email;
        const result = await user_service_1.default.deleteOneUsers({ email });
        return res.json({
            message: messages_1.USER_MESSAGES.DELETE_ONE_USER_SUCCESSFULLY,
            data: result
        });
    }
}
const userController = new UserController();
exports.default = userController;
