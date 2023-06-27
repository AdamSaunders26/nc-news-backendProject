const { selectArticle, selectAllArticles } = require("../models/article.model");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  
  if (!article_id) {
    selectAllArticles()
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
