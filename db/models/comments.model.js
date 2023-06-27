const db = require("../connection");

exports.selectComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.commentChecker = (article_id) => {
  return db
    .query(
      `SELECT articles.article_id, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY article_id ASC;`
    )
    .then((output) => {
      const commentLookup = {};
      output.rows.map((element) => {
        commentLookup[element.article_id] = element.comment_count;
      });

      if (Object.keys(commentLookup).includes(article_id)) {
        return commentLookup[article_id] !== 0;
      } else {
        return Promise.reject({ status: 404, message: "Error: Not Found" });
      }
    });
};
