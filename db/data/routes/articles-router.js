const {
  getArticles,
  patchArticle,
} = require("../../controllers/articles.controller");


const articlesRouter = require("express").Router();
console.log("there");
articlesRouter.get("/", getArticles);
articlesRouter.route("/:article_id").get(getArticles).patch(patchArticle);

module.exports = articlesRouter;
