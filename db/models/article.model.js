const db = require("../connection");
const format = require("pg-format");
const { formatArticles } = require("../utility");

exports.selectArticle = (article_id) => {
  let queryStr = `SELECT * FROM articles `;

  if (article_id) {
    queryStr += format(`WHERE article_id = %L`, [article_id]);
  }

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "Error: Not Found" });
    } else {
      return rows[0];
    }
  });
};

exports.selectAllArticles = async () => {
  const commentsQuery = await db
    .query(
      `SELECT articles.article_id, COUNT(comments.body) FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;`
    )
    .then(({ rows }) => {
      return rows;
    });

  const articlesQuery = await db
    .query(`SELECT * FROM articles ORDER BY created_at DESC`)
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });

  return formatArticles(articlesQuery, commentsQuery);
};
