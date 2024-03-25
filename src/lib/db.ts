import mongoose from "mongoose";
import config from '../../config/app'

if (!config.db.mongo_connection_string) {
  throw new Error("Please add the MONGO_URL environment variable");
}

mongoose.connect(config.db.mongo_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error"),
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;

export default database;

