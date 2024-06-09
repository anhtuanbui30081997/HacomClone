import cors from 'cors';
import express from 'express'
import helmet from 'helmet';
import hpp from 'hpp';
import { defaultErrorHandler } from '~/middlewares/errors.middleware';
import { Route } from '~/models/Route';
import categoriesRoute from '~/routes/categories.routes';
import onlineSellerRoute from '~/routes/onlineSellers.routes';
import productRoute from '~/routes/products.routes';
import purchaseRoute from '~/routes/purchases.routes';
import showroomRoute from '~/routes/showrooms.routes';
import staticRoute from '~/routes/static.routes';
import userRoute from '~/routes/users.routes';
import databaseService from '~/services/database.service';
import { initFolder } from '~/utils/file';

initFolder()
const routes: Route[] = [
  userRoute,
  showroomRoute,
  onlineSellerRoute,
  categoriesRoute,
  productRoute,
  staticRoute,
  purchaseRoute
]
const app = express();
const port = process.env.PORT || 4000
const production = process.env.NODE_ENV == 'production' ? true : false

const initializeDatabae = async () => {
  await databaseService.connect()
  await databaseService.indexProducts()
}
initializeDatabae()
if (production) {
  app.use(hpp())
  app.use(helmet())
  app.use(cors({ origin: 'your.domain.com', credentials: true }))
} else {
  // app.use(cors({ origin: 'http://localhost:3000' }))
  app.use(cors())
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes.forEach((route) => {
  app.use(`${route.path}`, route.router)
})
app.use(defaultErrorHandler)
app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;