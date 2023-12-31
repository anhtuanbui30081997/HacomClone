import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'
import { User } from '~/models/schemas/User.schema'
import Logger from '~/utils/logger'
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hacom.m3onxez.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri)
    // Create a new Db instance sharing the current socket connections.
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      this.client.connect().then(() => {
        Logger.info('You successfully connected to MongoDB!')
      })
      Logger.info('Database is connecting...')
    } catch (error) {
      Logger.error(error)
    }
  }

  get users() {
    return this.db.collection<User>(process.env.DB_USER_COLLECTION as string)
  }
  get refreshTokens() {
    return this.db.collection<RefreshToken>(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
