import 'dotenv/config'
import { Route } from './models/Route'
import App from './app'
import userRoute from './routes/users.routes'

const routes: Route[] = [userRoute]

const app = new App(routes)
app.listen()
