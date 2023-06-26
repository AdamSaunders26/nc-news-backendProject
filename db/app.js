const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { serverError } = require("./models/error-handlers");

const app = express();

app.get("/api/topics", getTopics);

app.use((req, res, next) => {
  res.status(404).send({ message: "This endpoint does not exist" });
});
app.use(serverError);

module.exports = app;
