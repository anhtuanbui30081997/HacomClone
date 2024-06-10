"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const showroom_service_1 = __importDefault(require("../services/showroom.service"));
class ShowroomController {
    async getAllShowrooms(req, res, next) {
        const showrooms = await showroom_service_1.default.getAllShowrooms();
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.SHOWROOM_MESSAGES.GET_SHOWROOMS_SUCCESSFULLY,
            data: showrooms
        });
    }
    async getShowroomsByRegion(req, res, next) {
        const { region } = req.params;
        const showrooms = await showroom_service_1.default.getShowroomsByRegion(Number(region));
        return res.status(httpStatus_1.default.OK).json({
            message: messages_1.SHOWROOM_MESSAGES.GET_SHOWROOMS_SUCCESSFULLY,
            data: showrooms
        });
    }
}
const showroomController = new ShowroomController();
showroomController.getShowroomsByRegion;
exports.default = showroomController;
