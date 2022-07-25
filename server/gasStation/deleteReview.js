"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

  module.exports = {
    deletePost,
  };
  