const db = require("../connection");

exports.selectArticle = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows.length === 0
        ? Promise.reject({ status: 400, message: "Error: Bad Request" })
        : rows[0];
    });
};
