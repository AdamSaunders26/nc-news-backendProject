const { selectComments, commentChecker } = require("../models/comments.model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  Promise.all([commentChecker(article_id), selectComments(article_id)])
    .then((resolvedPromises) => {
      res.status(200).send({ comments: resolvedPromises[1] });
    })
    .catch(next);
};
