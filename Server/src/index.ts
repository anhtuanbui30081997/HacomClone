import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'
import showroomRoute from './routes/showrooms.routes'
import onlineSellerRoute from './routes/onlineSellers.routes'
import categoriesRoute from './routes/categories.routes'
import purchaseRoute from './routes/purchases.routes'

// console.log('Start')

// setImmediate(() => {
//   console.log('setImmediate callback')
// })

// process.nextTick(() => {
//   console.log('process.nextTick callback')
// })

// setTimeout(() => {
//   console.log('Inside setTimeout (0ms)')
// }, 0)

// setTimeout(() => {
//   console.log('Inside setTimeout (1ms)')
// }, 100)

// console.log('End')

const routes: Route[] = [userRoute, showroomRoute, onlineSellerRoute, categoriesRoute, purchaseRoute]
const app = new App(routes)
app.listen()
