const db = require("../connection");
const format = require("pg-format");
// const { formatArticles } = require("../utility");

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

exports.selectAllArticles = async (query) => {
  const topicSafelist = [
    "mitch",
    "cats",
    "paper",
    "coding",
    "football",
    "cooking",
  ];
  const sortbySafelist = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const orderSafelist = ["asc", "desc"];

  let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id `;

  if (query.hasOwnProperty("topic") && topicSafelist.includes(query.topic)) {
    queryStr += `WHERE topic = '${query.topic}' `;
  } else if (
    query.hasOwnProperty("topic") &&
    !topicSafelist.includes(query.topic)
  ) {
    return Promise.reject({ status: 404, message: "Error: Not Found" });
  }
  queryStr += `GROUP BY articles.article_id `;

  if (query.hasOwnProperty("sortby") && sortbySafelist.includes(query.sortby)) {
    queryStr += `ORDER BY ${query.sortby} `;
  } else if (
    query.hasOwnProperty("sortby") &&
    !sortbySafelist.includes(query.sortby)
  ) {
    return Promise.reject({ status: 404, message: "Error: Not Found" });
  } else {
    queryStr += `ORDER BY created_at `;
  }

  if (query.hasOwnProperty("order") && orderSafelist.includes(query.order)) {
    queryStr += ` ${query.order}`;
  } else if (
    query.hasOwnProperty("order") &&
    !orderSafelist.includes(query.order)
  ) {
    return Promise.reject({ status: 400, message: "Error: Bad Request" });
  } else {
    queryStr += `DESC `;
  }

  const commentsQuery = await db
    .query(
      `SELECT articles.article_id, COUNT(comments.body) FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;`
    )
    .then(({ rows }) => {
      return rows;
    });

  const articlesQuery = await db.query(queryStr).then(({ rows }) => {
    return rows;
  });
  return articlesQuery;
  // return formatArticles(articlesQuery, commentsQuery);
};

exports.updateArticles = (inc_votes, article_id) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING * ;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.articleChecker = (article_id) => {
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
        return commentLookup;
      } else {
        return Promise.reject({ status: 404, message: "Error: Not Found" });
      }
    });
};
