const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

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
