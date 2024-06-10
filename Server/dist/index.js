"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const showrooms_routes_1 = __importDefault(require("./routes/showrooms.routes"));
const onlineSellers_routes_1 = __importDefault(require("./routes/onlineSellers.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const file_1 = require("./utils/file");
const static_routes_1 = __importDefault(require("./routes/static.routes"));
const purchases_routes_1 = __importDefault(require("./routes/purchases.routes"));
(0, file_1.initFolder)();
const routes = [
    users_routes_1.default,
    showrooms_routes_1.default,
    onlineSellers_routes_1.default,
    categories_routes_1.default,
    products_routes_1.default,
    static_routes_1.default,
    purchases_routes_1.default
];
const app = new app_1.default(routes);
app.listen();
exports.default = app;
// import express, { Request, Response } from 'express'
// const app = express()
// const port = process.env.PORT || 8080
// app.get('/', (_req: Request, res: Response) => {
//   return res.send('Express Typescript on Vercel')
// })
// app.get('/ping', (_req: Request, res: Response) => {
//   return res.send('pong 🏓')
// })
// app.listen(port, () => {
//   return console.log(`Server is listening on ${port}`)
// })
