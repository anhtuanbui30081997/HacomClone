"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
class RefreshToken {
    constructor(refreshToken) {
        const now = new Date();
        this._id = refreshToken._id;
        this.user_id = refreshToken.user_id;
        this.token = refreshToken.token;
        this.created_at = refreshToken.created_at || now;
        this.updated_at = refreshToken.updated_at || now;
        this.iat = new Date(refreshToken.iat * 1000); // Convert Epoch time to Date
        this.exp = new Date(refreshToken.exp * 1000); // Convert Epoch time to Date
    }
}
exports.RefreshToken = RefreshToken;
