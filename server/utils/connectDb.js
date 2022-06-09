const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  return client;
};

module.exports = { connectDb };