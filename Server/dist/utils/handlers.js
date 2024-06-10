"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestHandler = void 0;
const wrapRequestHandler = (func) => {
    return (req, res, next) => {
        try {
            func(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.wrapRequestHandler = wrapRequestHandler;
