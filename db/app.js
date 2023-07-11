const express = require("express");
const { serverError, customError, psqlError } = require("./error-handlers");
const apiRouter = require("./routes/api-router");
const userRouter = require("./routes/users-router");
const topicsRouter = require("./routes/topics-router");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");

const app = express();
app.use(express.json());

app.use("/api/", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", userRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "This endpoint does not exist" });
});
app.use(psqlError);
app.use(customError);
app.use(serverError);

module.exports = app;
