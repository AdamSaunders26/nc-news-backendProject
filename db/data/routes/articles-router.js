const {
  getArticles,
  patchArticle,
} = require("../../controllers/articles.controller");


const articlesRouter = require("express").Router();

articlesRouter.get("/", getArticles);
articlesRouter.route("/:article_id").get(getArticles).patch(patchArticle);

module.exports = articlesRouter;
