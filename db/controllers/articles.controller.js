const { sort } = require("../data/test-data/articles");
const {
  selectArticle,
  selectAllArticles,
  updateArticles,
} = require("../models/article.model");
const { articleChecker } = require("../models/article.model");
//const { sortByComments } = require("../utility");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { query } = req;

  if (!article_id) {
    selectAllArticles(query)
      .then((articles) => {
                res.status(200).send({ articles });
      })
      .catch(next);
  } else {
    selectArticle(article_id)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
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
