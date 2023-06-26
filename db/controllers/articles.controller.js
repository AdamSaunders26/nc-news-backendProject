const { selectArticle } = require("../models/article.model");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
    selectArticle(article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
