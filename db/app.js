const express = require("express");
const { getTopics } = require("./controllers/topics.controller");

const app = express();

app.use("/api/topics", getTopics);

if (process.env.PGDATABSE === "development") {
  app.listen(9090, () => {
    console.log("app is listening on port 9090");
  });
}

module.exports = app;
