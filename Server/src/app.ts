import express, { Router } from 'express'
import http, { createServer } from 'http'
import { Server } from 'socket.io'
import { Route } from './models/Route'
import databaseServices from './services/database.service'
import { defaultErrorHandler } from './middlewares/errors.middleware'
import cors from 'cors'
import hpp from 'hpp'
import helmet from 'helmet'
import Logger from './utils/logger'

class App {
  public app: express.Application
  public production: boolean
  public port: number | string
  public httpServer: http.Server
  public io: Server

  constructor(routes: Route[]) {
    this.app = express()
    this.port = process.env.PORT || 4000
    this.production = process.env.NODE_ENV == 'production' ? true : false
    // Create a local server to receive data from
    this.httpServer = createServer(this.app)
    this.io = new Server(this.httpServer)
    this.initializeDatabae()
    this.initializeAppMiddleware()
    this.initializeRoutes(routes)
    this.initializeErrorMiddleware()
  }

  private async initializeDatabae() {
    await databaseServices.connect()
    await databaseServices.indexProducts()
  }
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(`${route.path}`, route.router)
    })
  }
  private initializeAppMiddleware() {
    if (this.production) {
      this.app.use(hpp())
      this.app.use(helmet())
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }))
    } else {
      // this.app.use(cors({ origin: 'http://localhost:3000' }))
      this.app.use(cors())
    }
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }
  private initializeErrorMiddleware() {
    this.app.use(defaultErrorHandler)
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      Logger.info(`Example app listening on port ${this.port}`)
    })
  }
}

export default App
