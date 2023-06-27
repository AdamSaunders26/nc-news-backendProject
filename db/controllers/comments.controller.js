const { selectComments, commentChecker } = require("../models/comments.model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  if (/[A-z]/gi.test(article_id)) {
    next({ status: 400, message: "Error: Bad Request" });
  }
  Promise.all([commentChecker(article_id), selectComments(article_id)])
    .then((resolvedPromises) => {
      res.status(200).send({ comments: resolvedPromises[1] });
    })
    .catch(next);
};
