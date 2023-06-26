const db = require("../connection");

exports.selectArticle = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows.length === 0
        ? Promise.reject({ status: 404, message: "Error: Not Found" })
        : rows[0];
    });
};
