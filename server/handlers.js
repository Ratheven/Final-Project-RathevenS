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

////////////////////////////post a review ///////////////////////
const postReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("GasStation");
  const { _id, displayName, posted, post, id } = req.body;

  try {
    await client.connect();

    // const result = await db.collection("StationData").insertOne(req.body);
    const data = await db.collection("StationData").updateOne(
      { _id: ObjectId(`${_id}`) },
      {
        $push: {
          review: {
            id: id,
            displayName: displayName,
            posted: posted,
            post: post,
          },
        },
      }
    );

    client.close();
    res.status(200).json({
      status: 200,
      message: "you have posted a new Review",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
};

///////////////////////deletePost////////////////////////////////
const deletePost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("GasStation");
  const { id } = req.params;
  const { _id } = req.body;

  try {
    const result = await db.collection("StationData").update(
      { _id: ObjectId(`${_id}`) },
      {
        $pull: {
          review: {
            id: id,
          },
        },
      }
    );

    if (result.deletedCount === 1) {
      res.status(200).json({
        status: 200,
        message: "you have deleted a post",
      });
    }
    console.log(result, "deleted");
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  } finally {
    client.close();
  }
};

///////////////////update gas price/////////////
const getBestPrice = async (res, req) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("GasStation");
  const { id } = req.params;
  console.log("hiiiii", id);
  //console.log(name, " this is the id");
  try {
    // const result = await db.collection("StationData").find().toArray();
    // console.log(result, "this is the result");
  } catch (err) {}
};

module.exports = {
  getGasStation,
  getSingleGasStation,
  postReview,
  deletePost,
  getBestPrice,
};
