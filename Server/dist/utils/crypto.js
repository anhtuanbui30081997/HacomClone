"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const node_crypto_1 = require("node:crypto");
/**
 * Returns a SHA256 hash using SHA-2 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-2
 *
 * @param {String} content
 *
 * @returns {String}
 */
function sha256(content) {
    return (0, node_crypto_1.createHash)('sha256').update(content).digest('hex');
}
function hashPassword(password) {
    return sha256(password + process.env.PASSWORD_SECRET);
}
exports.hashPassword = hashPassword;
