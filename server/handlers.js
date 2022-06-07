"use strict";

const { MongoClient } = require("mongodb");

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
  console.log(filter, "this is the filter");
  console.log(typeof filter, "this is the filter");
  try {
    let result = [];
    if (filter === "Shell") {
      result = db
        .collection("StationData")
        .findMany({ name: filter })
        .toArray();
    } else if (filter === "Ultramaur") {
      result = db
        .collection("StationData")
        .findMany({ name: filter })
        .toArray();
    } else if (filter === "Esso") {
      result = db
        .collection("StationData")
        .findMany({ name: filter })
        .toArray();
    } else if (filter === "Couche-Tard") {
      result = db
        .collection("StationData")
        .findMany({ name: filter })
        .toArray();
    } else if (filter === "Reset" || filter === undefined) {
      result = await db.collection("StationData").find().toArray();
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
