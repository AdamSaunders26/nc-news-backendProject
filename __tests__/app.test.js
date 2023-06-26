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
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.article).toBe("object");
        expect(body.article).toHaveProperty("author");
        expect(body.article).toHaveProperty("title");
        expect(body.article).toHaveProperty("article_id");
        expect(body.article).toHaveProperty("body");
        expect(body.article).toHaveProperty("topic");
        expect(body.article).toHaveProperty("created_at");
        expect(body.article).toHaveProperty("votes");
        expect(body.article).toHaveProperty("article_img_url");
      });
  });
  test("400: should return an error message for a non-existing article_id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Error: Bad Request");
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
