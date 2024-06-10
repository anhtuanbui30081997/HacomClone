"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongodb_1 = require("mongodb");
class User {
    constructor(user) {
        const now = new Date();
        this._id = user._id || new mongodb_1.ObjectId();
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.created_at = user.created_at || now;
        this.updated_at = user.updated_at || now;
    }
}
exports.User = User;
