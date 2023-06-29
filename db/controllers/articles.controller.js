const {
  selectArticle,
  selectAllArticles,
  updateArticles,
} = require("../models/article.model");
const { articleChecker } = require("../models/article.model");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { query } = req;

  if (query.hasOwnProperty("sortby") && query.sortby === "comment_count") {
    if (query.hasOwnProperty("topic")) {
      selectAllArticles({ topic: query.topic }).then((o) => {
        console.log("you haven't made this yet");
      });
    } else {
      selectAllArticles({}).then((o) => {
        console.log(o);
      });
    }
  }

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
