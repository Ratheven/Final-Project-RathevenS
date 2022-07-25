"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updatePrice = async (req, res) => {
    const { _id, gasPrice } = req.body;
  
    if (!_id || !gasPrice) {
      return res
        .send(400)
        .json({ status: 400, message: "Missing info", error: true });
    }
  
    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("GasStation");
  
      const queryObj = {
        _id: ObjectId(_id),
      };
  
      const updateObj = {
        $set: { gasPrice },
      };
  
      const updateResult = await db
        .collection("StationData")
        .updateOne(queryObj, updateObj);
  
      const { acknowledged, modifiedCount } = updateResult;
      console.log(acknowledged, modifiedCount);
      if (acknowledged && modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: `Updated price for stationID: ${_id}`, data: null });
      } else {
        return res
          .status(400)
          .json({ message: `Current price is already ${gasPrice} `, data: null });
      }
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
    updatePrice,
  };
  