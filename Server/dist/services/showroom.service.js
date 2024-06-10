"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./database.service"));
class ShowroomService {
    async getAllShowrooms() {
        const showrooms = await database_service_1.default.showrooms.find({}).toArray();
        return showrooms;
    }
    async getShowroomsByRegion(region) {
        const showrooms = await database_service_1.default.showrooms
            .find({
            region: region
        })
            .toArray();
        return showrooms;
    }
}
const showroomService = new ShowroomService();
exports.default = showroomService;
