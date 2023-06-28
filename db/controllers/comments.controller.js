const { articleChecker } = require("../models/article.model");
const { insertCommment } = require("../models/comments.model");
const { selectComments  } = require("../models/comments.model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  Promise.all([selectComments(article_id), articleChecker(article_id)])
    .then((resolvedPromises) => {
      res.status(200).send({ comments: resolvedPromises[0] });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  insertCommment(username, body, article_id)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
