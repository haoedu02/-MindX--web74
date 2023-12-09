import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@education.pdxgcc7.mongodb.net/`;

class DatabaseService {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async run() {
    try {
      await this.db.command({
        ping: 1,
      });
      console.log(
        `Pinged your development. You connect successfully to MongoDB`
      );
    } catch (error) {
      console.log(`Error`, error);
      throw new Error(error.message);
    }
  }
  get users() {
    return this.db.collection("users");
  }
}

const databaseService = new DatabaseService();
export default databaseService;
