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

const app = express();
app.use(express.json());

app.get("/api/", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getComments);
app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.use((req, res, next) => {
  res.status(404).send({ message: "This endpoint does not exist" });
});
app.use(psqlError);
app.use(customError);
app.use(serverError);

module.exports = app;
