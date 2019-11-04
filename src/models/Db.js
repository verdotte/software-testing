import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

class Database {
  static async connect() {
    // Mongoose connection
    try {
      await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected successfully');
    } catch (e) {
      console.error(`Unable to connect to the database \n At ${
        DATABASE_URL
      } \n With error ${e}`,);
    }
  }
}

export default Database;
