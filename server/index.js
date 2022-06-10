"use strict";

const express = require("express");
// const app = express();
const morgan = require("morgan");

const {
  getGasStation,
  getSingleGasStation,
  postReview,
  deletePost,
  getBestPrice,
} = require("./handlers");

const { createUser } = require("./handlers/users/createUser");
const { getUser } = require("./handlers/users/getUser");
const { updateUser } = require("./handlers/users/updateUser");

// const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  .get("/api/gasStation", getGasStation)

  .get("/api/gasStation/:id", getSingleGasStation)

  .post("/post/createPost", postReview)
  .delete("/post/delete/:id", deletePost)

  .post("/bestPrice/:id", getBestPrice)

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
