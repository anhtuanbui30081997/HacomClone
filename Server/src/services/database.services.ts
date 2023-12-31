import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { User } from '~/models/schemas/User.schema'
import Logger from '~/utils/logger'
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hacom.m3onxez.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    // Create a new Db instance sharing the current socket connections.
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      Logger.info('Database is connecting...')
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      Logger.info('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      Logger.error(error)
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }

  get users() {
    return this.db.collection<User>(process.env.DB_USER_COLLECTION as string)
  }
}

const databaseServices = new DatabaseService()
export default databaseServices
