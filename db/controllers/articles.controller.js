const { sort } = require("../data/test-data/articles");
const {
  selectArticles,
  updateArticles,
  insertArticle,
  destroyArticle,
} = require("../models/article.model");
const { articleChecker } = require("../models/article.model");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { query } = req;
  query.article_id = Number(article_id);

  Promise.all([selectArticles(query), articleChecker(article_id)])
    .then((articles) => {
      res.status(200).send({
        articles: articles[0].articles,
        totalCount: articles[0].totalCount,
      });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  Promise.all([
    updateArticles(inc_votes, article_id),
    articleChecker(article_id),
  ])
    .then((resolvedPromises) => {
      res.status(200).send({ patchedArticle: resolvedPromises[0] });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const article = req.body;

  insertArticle(article)
    .then((postedArticle) => {
      res.status(201).send({ postedArticle });
    })
    .catch((err) => {
      err.code == 23503
        ? next({ status: 400, message: "Error: Bad Request" })
        : next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  destroyArticle(article_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
