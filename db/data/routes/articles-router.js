const {
  getArticles,
  patchArticle,
  postArticle,
} = require("../../controllers/articles.controller");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles).post(postArticle);
articlesRouter.route("/:article_id").get(getArticles).patch(patchArticle);

module.exports = articlesRouter;
