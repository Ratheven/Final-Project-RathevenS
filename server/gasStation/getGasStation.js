"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGasStation = async (req, res) => {
  const filter = req.query.filter;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("GasStation");

  try {
    let result;

    if (filter === "Reset") {
      result = await db.collection("StationData").find().toArray();
    } else {
      result = await db
        .collection("StationData")
        .find({ name: filter })
        .toArray();
    }

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getGasStation,
};
