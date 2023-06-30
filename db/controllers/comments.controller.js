const { articleChecker } = require("../models/article.model");
const {
  insertCommment,
  destroyComment,
  selectComments,
  updateComment,
} = require("../models/comments.model");

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

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  destroyComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes).then((patchedComment) => {
    res.status(200).send({ patchedComment });
  }).catch(next);
};
