const { MongoClient } = require("mongodb");

require("dotenv").config();
const data = require("./data");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GasStation");

    await db.collection("StationData").insertMany(data);

    res.status(200).json({ status: 200, message: "done" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
};

batchImport();
