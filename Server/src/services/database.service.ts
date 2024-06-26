import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { Category } from '~/models/schemas/Category.schema'
import { Laptop } from '~/models/schemas/Laptop.schema'
import { OnlineSeller } from '~/models/schemas/OnlineSeller.schema'
import { Product } from '~/models/schemas/Product.schema'
import { Purchase } from '~/models/schemas/Purchase.schema'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'
import { Showroom } from '~/models/schemas/Showroom.schema'
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

  async indexProducts() {
    const exists = await this.products.indexExists(['name_text', 'product_code_text'])
    if (!exists) {
      this.products.createIndex(
        {
          name: 'text',
          product_code: 'text'
        },
        {
          default_language: 'none'
        }
      )
    }
  }

  get users() {
    return this.db.collection<User>(process.env.DB_USER_COLLECTION as string)
  }
  get refreshTokens() {
    return this.db.collection<RefreshToken>(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
  }
  get showrooms() {
    return this.db.collection<Showroom>(process.env.DB_SHOWROOM_COLLECTION as string)
  }
  get onlineSellers() {
    return this.db.collection<OnlineSeller>(process.env.DB_ONLINE_SELLER_COLLECTION as string)
  }
  get categories() {
    return this.db.collection<Category>(process.env.DB_CATEGORY_COLLECTION as string)
  }
  get products() {
    return this.db.collection<Product>(process.env.DB_PRODUCT_COLLECTION as string)
  }
  get laptops() {
    return this.db.collection<Laptop>(process.env.DB_LAPTOP_COLLECTION as string)
  }
  get purchases() {
    return this.db.collection<Purchase>(process.env.DB_PURCHASE_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
