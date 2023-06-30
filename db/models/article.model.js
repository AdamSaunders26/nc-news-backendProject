const db = require("../connection");
const format = require("pg-format");

exports.selectArticles = (query) => {
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

  const article = !query.article_id ? `` : `articles.body, `;
  let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, ${article} articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id `;

  if (query.hasOwnProperty("topic") && topicSafelist.includes(query.topic)) {
    queryStr += `WHERE topic = '${query.topic}' `;
  } else if (
    query.hasOwnProperty("article_id") &&
    query.article_id.toString() !== "NaN"
  ) {
    queryStr += `WHERE articles.article_id = ${query.article_id} `;
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

  return db.query(queryStr).then(({ rows }) => {
    return !query.article_id ? rows : rows[0];
  });
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
      if (!article_id) {
        return;
      }

      if (Number(article_id).toString() === "NaN") {
        return Promise.reject({ status: 400, message: "Error: Bad Request" });
      }

      if (!Object.keys(commentLookup).includes(article_id)) {
        return Promise.reject({ status: 404, message: "Error: Not Found" });
      }
    });
};

exports.insertArticle = (article) => {
  const query = format(
    `INSERT INTO articles (author, title, body, topic) VALUES (%L); SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id WHERE articles.title = %L GROUP BY articles.article_id; `,
    [article.author, article.title, article.body, article.topic],
    [article.title]
  );

  return db.query(query).then((output) => {
    return output[1].rows[0];
  });
};
