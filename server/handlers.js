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
  const { _id, displayName, posted, post, id, stars, email, displayPic } =
    req.body;

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
            stars: stars,
            email: email,
            displayPic: displayPic,
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

/////////////////////search Bar/////////////////////
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


////
//* ADD FAVOURITE STATION
const addFavoriteStation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("data-name");

  const { _id, sub } = req.body;

  const queryObj = {
    sub,
  };

  const updateObj = {
    $push: { favourite: _id },
  };

  try {
    const updateResult = await db
      .collection("users")
      .updateOne(queryObj, updateObj);

    const { acknowledged, modifiedCount } = updateResult;
    console.log(acknowledged, modifiedCount);
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
  getGasStation,
  getSingleGasStation,
  postReview,
  deletePost,
  updatePrice,
  getAllGasStation,
  addFavoriteStation,
};
