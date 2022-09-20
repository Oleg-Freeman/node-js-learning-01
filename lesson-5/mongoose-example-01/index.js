const { connect } = require("mongoose");
const express = require("express");

const { mongoURL } = require("./config");
const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
});

app.listen(5001, () => {
  console.log("Server started");

  connect(mongoURL, { dbName: "database" })
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err.message));
});
