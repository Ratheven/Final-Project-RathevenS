"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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
  
  module.exports = {
    postReview,
  };
  