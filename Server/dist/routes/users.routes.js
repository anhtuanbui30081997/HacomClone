"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("~/controllers/users.controller"));
const users_middleware_1 = require("~/middlewares/users.middleware");
const handlers_1 = require("~/utils/handlers");
const usersRouter = (0, express_1.Router)();
/**
 * Description. Register account
 * Method: Post
 * Path: '/register'
 * Body: RegisterRequestBody
 */
usersRouter.post('/register', users_middleware_1.RegisterValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.register));
/**
 * Description. Login to account
 * Method: Post
 * Path: '/login'
 * Body: LoginRequestBody
 */
usersRouter.post('/login', users_middleware_1.LoginValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.login));
/**
 * Description. Login to account
 * Method: Post
 * Path: '/login'
 * Body: LoginRequestBody
 */
usersRouter.post('/login-admin', users_middleware_1.LoginAdminValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.loginAdmin));
/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */
usersRouter.post('/logout', users_middleware_1.accessTokenValidator, users_middleware_1.refreshTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.logout));
/**
 * Description. Refresh access token
 * Path: /refresh-token
 * Method: POST
 * Body: {refresh_token: string}
 */
usersRouter.post('/refresh-token', users_middleware_1.refreshTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.refreshToken));
/**
 * Description. Refresh access token
 * Path: /forgot-password-request
 * Method: POST
 * Body: {email: string}
 */
usersRouter.post('/forgot-password-request', users_middleware_1.forgotPasswordRequestValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.forgotTokenRequest));
/**
 * Description. Refresh access token
 * Path: /forgot-password-request
 * Method: PUT
 * Body: UpdatePasswordRequestBody
 */
usersRouter.post('/update-password', users_middleware_1.updatePasswordValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.updatePassword));
/**
 * Description. Refresh access token
 * Path: /get-all-users
 * Method: PUT
 * Body: None
 */
usersRouter.get('/get-all-users', users_middleware_1.accessTokenAdminValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.getAllUsers));
/**
 * Description. Refresh access token
 * Path: /get-all-users
 * Method: PUT
 * Body: None
 */
usersRouter.post('/delete-one-user', users_middleware_1.accessTokenAdminValidator, (0, handlers_1.wrapRequestHandler)(users_controller_1.default.deleteOneUser));
const userRoute = {
    path: '/users',
    router: usersRouter
};
exports.default = userRoute;
