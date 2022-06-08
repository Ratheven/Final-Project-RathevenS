const { MongoClient } = require("mongodb");

require("dotenv").config();
const data = require("./data");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GasStation");

    const result = await db.collection("StationData").insertMany(data);

    if (result) {
      console.log("success");
    }
  } catch (err) {
    console.log(err.message);
  }
  client.close();
};

batchImport();
