"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSingleGasStation = async (req, res) => {
    const { id } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
      const db = client.db("GasStation");
      const data = await db
        .collection("StationData")
        .findOne({ _id: ObjectId(`${id}`) });
  
      res.status(200).json({
        status: 200,
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "something wrong",
      });
    } finally {
      client.close();
    }
  };
  
    module.exports = {
      getSingleGasStation,
    };
    