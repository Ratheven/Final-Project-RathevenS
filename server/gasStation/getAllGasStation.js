"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const getAllGasStation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GasStation");
  
    try {
      const result = await db.collection("StationData").find().toArray();
  
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
    getAllGasStation,
  };
  