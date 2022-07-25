"use strict";

const express = require("express");
// const app = express();
const morgan = require("morgan");

const { createUser } = require("./handlers/users/createUser");
const { getUser } = require("./handlers/users/getUser");
const { updateUser } = require("./handlers/users/updateUser");
const {getGasStation} = require("./gasStation/getGasStation")
const {getSingleGasStation}= require("./gasStation/getSingleGasStation")
const {postReview}=require("./gasStation/postReview")
const {deletePost}=require("./gasStation/deleteReview")
const {updatePrice}=require("./gasStation/updatePrice")
const {getAllGasStation}=require("./gasStation/getAllGasStation")
const {addFavoriteStation}=require("./gasStation/addFavoriteStation")

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  //this fetch will get all the gas station for the hompage map
  .get("/api/gasStation", getGasStation)
  //this fetch will get a single gas station used for the gas station detail page
  .get("/api/gasStation/:id", getSingleGasStation)
  //this fetch will create a post
  .post("/post/createPost", postReview)
  //this fetch will delete the post 
  .delete("/post/delete/:id", deletePost)
  //this fetch will update the gas price
  .patch("/bestPrice", updatePrice)
  //ths fetch will get all the gas station for the search bar
  .get("/getAllGasStation",getAllGasStation )
  //This fetch will update the user profile and add the gas station id in a array
  .patch("/user/favoriteStations/add", addFavoriteStation)

  .post("/user", createUser)
  .get("/user/:sub", getUser)
  .patch("/user/:sub", updateUser)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000);

// .listen(PORT, () => console.info(`Listening on port ${PORT}`));
