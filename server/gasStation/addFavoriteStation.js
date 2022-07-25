"use strict";
//connect to Mangodb
const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addFavoriteStation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("data-name");
//grabe _id of the gas station and the unique sub from Auth0 
  const { _id, sub } = req.body;

  const queryObj = {
    sub,
  };

  const updateObj = {
    $push: { favourite: _id },
  };
//add _id in the array of the user profile
  try {
    const updateResult = await db
      .collection("users")
      .updateOne(queryObj, updateObj);

    const { acknowledged, modifiedCount } = updateResult;
    //if successfull send status 200
    if (acknowledged && modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: `Added Station id to favourites`, data: null });
    } else {
      return res
        .status(400)
        .json({ message: `Station is already added `, data: null });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  addFavoriteStation,
};
