"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hacom.m3onxez.mongodb.net/?retryWrites=true&w=majority`;
class DatabaseService {
    constructor() {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        this.client = new mongodb_1.MongoClient(uri);
        // Create a new Db instance sharing the current socket connections.
        this.db = this.client.db(process.env.DB_NAME);
    }
    async connect() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            this.client.connect().then(() => {
                // Logger.info('You successfully connected to MongoDB!')
                console.log('You successfully connected to MongoDB!');
            });
            // Logger.info('Database is connecting...')
            console.log('Database is connecting...');
        }
        catch (error) {
            // Logger.error(error)
            console.log(error);
        }
    }
    async indexProducts() {
        const exists = await this.products.indexExists(['name_text', 'product_code_text']);
        if (!exists) {
            this.products.createIndex({
                name: 'text',
                product_code: 'text'
            }, {
                default_language: 'none'
            });
        }
    }
    get users() {
        return this.db.collection(process.env.DB_USER_COLLECTION);
    }
    get refreshTokens() {
        return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION);
    }
    get showrooms() {
        return this.db.collection(process.env.DB_SHOWROOM_COLLECTION);
    }
    get onlineSellers() {
        return this.db.collection(process.env.DB_ONLINE_SELLER_COLLECTION);
    }
    get categories() {
        return this.db.collection(process.env.DB_CATEGORY_COLLECTION);
    }
    get products() {
        return this.db.collection(process.env.DB_PRODUCT_COLLECTION);
    }
    get laptops() {
        return this.db.collection(process.env.DB_LAPTOP_COLLECTION);
    }
    get purchases() {
        return this.db.collection(process.env.DB_PURCHASE_COLLECTION);
    }
}
const databaseService = new DatabaseService();
exports.default = databaseService;
