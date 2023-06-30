const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { serverError, customError, psqlError } = require("./error-handlers");
const { getEndpoints } = require("./controllers/api.controller");
const {
  getArticles,
  patchArticle,
} = require("./controllers/articles.controller");
const {
  getComments,
  postComment,
  deleteComment,
} = require("./controllers/comments.controller");
const { getUsers } = require("./controllers/users.controller");
const apiRouter = require("./data/routes/api-router");
const userRouter = require("./data/routes/users-router");
const topicsRouter = require("./data/routes/topics-router");
const articlesRouter = require("./data/routes/articles-router");
const commentsRouter = require("./data/routes/comments-router");

const app = express();
app.use(express.json());

app.use("/api/", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", userRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/articles", commentsRouter);
app.use("/api/comments", commentsRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "This endpoint does not exist" });
});
app.use(psqlError);
app.use(customError);
app.use(serverError);

module.exports = app;
