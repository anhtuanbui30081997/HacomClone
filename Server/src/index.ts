import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'
import showroomRoute from './routes/showrooms.routes'
import onlineSellerRoute from './routes/onlineSellers.routes'
import categoriesRoute from './routes/categories.routes'
import productRoute from './routes/products.routes'
import { initFolder } from './utils/file'
import staticRoute from './routes/static.routes'
import purchaseRoute from './routes/purchases.routes'

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
const app = new App(routes)
app.listen()
