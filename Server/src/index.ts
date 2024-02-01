import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'
import showroomRoute from './routes/showrooms.routes'
import onlineSellerRoute from './routes/onlineSellers.routes'
import categoriesRoute from './routes/categories.routes'

const routes: Route[] = [userRoute, showroomRoute, onlineSellerRoute, categoriesRoute]
const app = new App(routes)
app.listen()
