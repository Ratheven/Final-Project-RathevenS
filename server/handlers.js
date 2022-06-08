"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//////////////////get all gasStation//////////////////////
const getGasStation = async (req, res) => {
  const filter = req.query.filter;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("GasStation");
  console.log(filter, "this is the filter");

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

    // console.log(result, "this i sthe result");
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

////////////////////get single gasStation///////////////////////
const getSingleGasStation = async (req, res) => {
  const { id } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("GasStation");
    const data = await db
      .collection("StationData")
      .findOne({ _id: ObjectId(`${id}`) });
    console.log(data, "this is the data");

    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
};

module.exports = {
  getGasStation,
  getSingleGasStation,
};
