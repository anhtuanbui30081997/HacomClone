"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_service_1 = __importDefault(require("./services/database.service"));
const errors_middleware_1 = require("./middlewares/errors.middleware");
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 4000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;
        // Create a local server to receive data from
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
        this.initializeDatabae();
        this.initializeAppMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }
    async initializeDatabae() {
        await database_service_1.default.connect();
        await database_service_1.default.indexProducts();
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(`${route.path}`, route.router);
        });
    }
    initializeAppMiddleware() {
        if (this.production) {
            this.app.use((0, hpp_1.default)());
            this.app.use((0, helmet_1.default)());
            this.app.use((0, cors_1.default)({ origin: 'your.domain.com', credentials: true }));
        }
        else {
            // this.app.use(cors({ origin: 'http://localhost:3000' }))
            this.app.use((0, cors_1.default)());
        }
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeErrorMiddleware() {
        this.app.use(errors_middleware_1.defaultErrorHandler);
    }
    listen() {
        this.httpServer.listen(this.port, () => {
            // Logger.info(`Example app listening on port ${this.port}`)
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
exports.default = App;
