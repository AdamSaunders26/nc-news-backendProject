const db = require("../connection");
const format = require("pg-format");

exports.selectArticle = (article_id) => {
  let queryStr = `SELECT * FROM articles `;

  if (article_id) {
    queryStr += format(`WHERE article_id = %L`, [article_id]);
  }

  return db.query(queryStr).then(({ rows }) => {
    console.log(rows);
    console.log(rows.length);
    switch (rows.length) {
      case 0:
        return Promise.reject({ status: 404, message: "Error: Not Found" });
      case 1:
        return rows[0];
      default:
        console.log(rows);
        return rows;
    }
  });
};

//You'll need this tomorrow...

// SELECT articles.article_id, COUNT(comments.body) FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;
