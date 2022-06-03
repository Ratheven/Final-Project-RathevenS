const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/greeting", (req, res) => {
    res.send("Hello again");
  });

app.listen(8000);
