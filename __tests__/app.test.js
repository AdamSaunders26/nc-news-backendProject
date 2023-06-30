const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const { getComments } = require("../db/controllers/comments.controller");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  test("200: should get all topics as an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
  test("404: should return error message if the endpoint does not exist", () => {
    return request(app)
      .get("/api/goobledegook")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("This endpoint does not exist");
      });
  });
});

describe("GET /api/", () => {
  test("200: should return an object with all other avilable endpoints", () => {
    const endpointsObj = require("../endpoints.json");
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpointsObj);
        expect(typeof body.endpoints).toBe("object");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: should return the article object linked to the given id", () => {
    const exampleObject = {
      article_id: 3,
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      body: "some gifs",
      created_at: "2020-11-03T09:12:00.000Z",
      votes: 0,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.articles).toBe("object");
        expect(body.articles).toMatchObject(exampleObject);
      });
  });
  test("200: should return the article object linked to the given id with comment_count", () => {
    const exampleObject = {
      article_id: 3,
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      body: "some gifs",
      created_at: "2020-11-03T09:12:00.000Z",
      votes: 0,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      comment_count: "2",
    };
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.articles).toBe("object");
        expect(body.articles).toMatchObject(exampleObject);
      });
  });
  test("404: should return an error message for a non-existing article_id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400: should return an error message for an invalid article_id", () => {
    return request(app)
      .get("/api/articles/snorlax")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: should return an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "created_at",
          descending: true,
        });
        body.articles.forEach((article) => {
          expect(typeof article).toBe("object");
          expect(article).not.toHaveProperty("body");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: should return an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const expectedComment = {
          comment_id: expect.any(Number),
          body: expect.any(String),
          article_id: 1,
          author: expect.any(String),
          votes: expect.any(Number),
        };
        expect(body.comments).toBeSorted({
          key: "created_at",
          descending: true,
        });
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject(expectedComment);
        });
      });
  });
  test("404: should return an error message for an non-existant article_id", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400: should return an error message for an invalid article_id", () => {
    return request(app)
      .get("/api/articles/shialebeouf/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("200: should return an empty array if there are no comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: should post a comment for an article and return the posted comment", () => {
    const comment = {
      username: "butter_bridge",
      body: "I wish there more bridges made of butter...",
    };
    const expectedComment = {
      comment_id: expect.any(Number),
      body: "I wish there more bridges made of butter...",
      article_id: 2,
      author: "butter_bridge",
      votes: expect.any(Number),
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(201)
      .then(({ body }) => {
        expect(body.postedComment).toMatchObject(expectedComment);
      });
  });
  test("400: should return an error if no username is provided", () => {
    const comment = {
      body: "I wish there more bridges made of butter...",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("400: should return an error if no body is provided", () => {
    const comment = {
      username: "butter_bridge",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("404: should return an error if an invalid username is provided", () => {
    const comment = {
      username: "hansolo",
      body: "I wish there more bridges made of butter...",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400: should return an error if the body is not a string", () => {
    const comment = {
      username: "butter_bridge",
      body: 26,
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });

  test("404: should return an error if the article_id does not exist", () => {
    const comment = {
      username: "butter_bridge",
      body: "best comment ever",
    };

    return request(app)
      .post("/api/articles/999/comments")
      .send(comment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400: should return an error if the article_id is invalid", () => {
    const comment = {
      username: "butter_bridge",
      body: "best comment ever",
    };

    return request(app)
      .post("/api/articles/shialebeouf/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("400: should return an error if the comment is an empty object", () => {
    const comment = {};

    return request(app)
      .post("/api/articles/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: should increment the given articles votes by the given amount ", () => {
    const newVotes = { inc_votes: 1 };
    const expectedArticle = {
      article_id: 2,
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      votes: 1,
    };
    return request(app)
      .patch("/api/articles/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        expect(body.patchedArticle).toMatchObject(expectedArticle);
      });
  });
  test("200: should increment the given articles votes by a large amount ", () => {
    const newVotes = { inc_votes: 100 };
    const expectedArticle = {
      article_id: 2,
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      votes: 100,
    };
    return request(app)
      .patch("/api/articles/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        expect(body.patchedArticle).toMatchObject(expectedArticle);
      });
  });
  test("200: should decrement the given articles votes if given a negative amount", () => {
    const newVotes = { inc_votes: -12 };
    const expectedArticle = {
      article_id: 2,
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      votes: -12,
    };
    return request(app)
      .patch("/api/articles/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        expect(body.patchedArticle).toMatchObject(expectedArticle);
      });
  });
  test("400: should return an error if not given a number", () => {
    const newVotes = { inc_votes: "Nic Cage" };
    return request(app)
      .patch("/api/articles/2")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("400: should return an error if given an empty object", () => {
    const newVotes = {};
    return request(app)
      .patch("/api/articles/2")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("404: should return an error if given a non-existing article_id", () => {
    const newVotes = { inc_votes: 24 };
    return request(app)
      .patch("/api/articles/789")
      .send(newVotes)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400: should return an error if given an invalid article_id", () => {
    const newVotes = { inc_votes: 24 };
    return request(app)
      .patch("/api/articles/harrypotter")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: should delete the comment linked to the given comment_id", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("404: should return an error if given a non-existing comment_id", () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("400 should return an error if given an invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/spider-man")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
});

describe("GET /api/users", () => {
  test("200: should return an array of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        expect(Array.isArray(body.users)).toBe(true);
        body.users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });
});

describe("GET /api/articles?query=true", () => {
  test("200: should allow users to search by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("200: should allow users to search by different topics", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(1);
        body.articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });
  test("200: should return an empty array if there are no articles with a valid topic", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(0);
      });
  });

  test("200: should allow users to sort by columns", () => {
    return request(app)
      .get("/api/articles?sortby=title")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({ key: "title", descending: true });
      });
  });
  test("200: should allow users to sort by different columns", () => {
    return request(app)
      .get("/api/articles?sortby=author")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({ key: "author", descending: true });
      });
  });
  test("200: should allow users to sort by comment_count", () => {
    return request(app)
      .get("/api/articles?sortby=comment_count")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({
          key: "comment_count",
          descending: true,
          coerce: true,
        });
      });
  });
  test("200: should allow users to sort by comment_count and order", () => {
    return request(app)
      .get("/api/articles?sortby=comment_count&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({
          key: "comment_count",
          ascending: true,
          coerce: true,
        });
      });
  });
  test("200: should allow users to sort by comment_count and topic", () => {
    return request(app)
      .get("/api/articles?sortby=comment_count&topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);
        expect(body.articles).toBeSorted({
          key: "comment_count",
          descending: true,
          coerce: true,
        });
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("200: should allow users to sort by comment_count, order and topic", () => {
    return request(app)
      .get("/api/articles?sortby=comment_count&topic=mitch&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);
        expect(body.articles).toBeSorted({
          key: "comment_count",
          ascending: true,
          coerce: true,
        });
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("200: should allow users to sort by different columns and filter by topic", () => {
    return request(app)
      .get("/api/articles?sortby=author&topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);
        expect(body.articles).toBeSorted({ key: "author", descending: true });
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("200: should allow users to choose the sort order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({
          key: "created_at",
          ascending: true,
        });
      });
  });
  test("200: should allow users to sort by descending as well", () => {
    return request(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({
          key: "created_at",
          descending: true,
        });
      });
  });

  test("200: should allow users filter by topic and sorted in an order", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sortby=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);
        expect(body.articles).toBeSorted({
          key: "title",
          ascending: true,
        });
      });
  });

  test("400: should return an error for invalid order", () => {
    return request(app)
      .get("/api/articles?order=sideways")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
      });
  });
  test("404: should return an error if the topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=hooligans")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  test("404: should return an error message for an invalid column", () => {
    return request(app)
      .get("/api/articles?sortby=flavour")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
});

describe("/GET /api/users/:username", () => {
  test("200: should return the expected user object", () => {
    const expectedObject = {
      username: "butter_bridge",
      avatar_url:
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      name: "jonny",
    };
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toMatchObject(expectedObject);
      });
  });
  test("404: should return an error if the specified username does not exist", () => {
    return request(app)
      .get("/api/users/freddiemercury")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Not Found");
      });
  });
  
});
