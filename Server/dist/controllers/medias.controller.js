"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const direction_1 = require("~/constants/direction");
class MediasController {
    async serveImageController(req, res, next) {
        const { name } = req.params;
        return res.sendFile(path_1.default.resolve(direction_1.UPLOAD_IMAGE_DIR, name), (err) => {
            if (err) {
                res.status(err.status).send('Image not found');
            }
        });
    }
}
const mediasController = new MediasController();
exports.default = mediasController;
