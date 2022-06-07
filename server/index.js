"use strict";

const express = require("express");
// const app = express();
const morgan = require("morgan");

const { getGasStation } = require("./handlers");

// const PORT = 8000;

express()
 

  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  .get("/api/gasStation", getGasStation)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000);

// .listen(PORT, () => console.info(`Listening on port ${PORT}`));
