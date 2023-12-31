import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'
import databaseServices from './services/database.service'

const routes: Route[] = [userRoute]
const app = new App(routes)
app.listen()
