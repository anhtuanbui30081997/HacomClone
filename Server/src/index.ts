import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'
import databaseServices from './services/database.service'
import showroomRoute from './routes/showrooms.routes'

const routes: Route[] = [userRoute, showroomRoute]
const app = new App(routes)
app.listen()
