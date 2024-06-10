"use strict";
// import 'dotenv/config'
// import { Route } from './models/Route'
// import App from './app'
// import userRoute from './routes/users.routes'
// import showroomRoute from './routes/showrooms.routes'
// import onlineSellerRoute from './routes/onlineSellers.routes'
// import categoriesRoute from './routes/categories.routes'
// import productRoute from './routes/products.routes'
// import { initFolder } from './utils/file'
// import staticRoute from './routes/static.routes'
// import purchaseRoute from './routes/purchases.routes'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// initFolder()
// const routes: Route[] = [
//   userRoute,
//   showroomRoute,
//   onlineSellerRoute,
//   categoriesRoute,
//   productRoute,
//   staticRoute,
//   purchaseRoute
// ]
// const app = new App(routes)
// app.listen()
// export default app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
