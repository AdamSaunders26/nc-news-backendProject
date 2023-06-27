const { formatArticles } = require("../db/utility");

const testArticleData = [
  {
    article_id: 1,
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: "2020-07-09T20:11:00.000Z",
    votes: 100,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 2,
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: "2020-10-16T05:03:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 3,
    title: "Eight pug gifs that remind me of mitch",
    topic: "mitch",
    author: "icellusedkars",
    body: "some gifs",
    created_at: "2020-11-03T09:12:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 4,
    title: "Student SUES Mitch!",
    topic: "mitch",
    author: "rogersop",
    body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
    created_at: "2020-05-06T01:14:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 5,
    title: "UNCOVERED: catspiracy to bring down democracy",
    topic: "cats",
    author: "rogersop",
    body: "Bastet walks amongst us, and the cats are taking arms!",
    created_at: "2020-08-03T13:14:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 6,
    title: "A",
    topic: "mitch",
    author: "icellusedkars",
    body: "Delicious tin of cat food",
    created_at: "2020-10-18T01:00:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 7,
    title: "Z",
    topic: "mitch",
    author: "icellusedkars",
    body: "I was hungry.",
    created_at: "2020-01-07T14:08:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 8,
    title: "Does Mitch predate civilisation?",
    topic: "mitch",
    author: "icellusedkars",
    body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
    created_at: "2020-04-17T01:08:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 9,
    title: "They're not exactly dogs, are they?",
    topic: "mitch",
    author: "butter_bridge",
    body: "Well? Think about it.",
    created_at: "2020-06-06T09:10:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 10,
    title: "Seven inspirational thought leaders from Manchester UK",
    topic: "mitch",
    author: "rogersop",
    body: "Who are we kidding, there is only one, and it's Mitch!",
    created_at: "2020-05-14T04:15:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 11,
    title: "Am I a cat?",
    topic: "mitch",
    author: "icellusedkars",
    body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
    created_at: "2020-01-15T22:21:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 12,
    title: "Moustache",
    topic: "mitch",
    author: "butter_bridge",
    body: "Have you seen the size of that thing?",
    created_at: "2020-10-11T11:24:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 13,
    title: "Another article about Mitch",
    topic: "mitch",
    author: "butter_bridge",
    body: "There will never be enough articles about Mitch!",
    created_at: "2020-10-11T11:24:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
];
const testArticleDataCopy = [
  {
    article_id: 1,
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: "2020-07-09T20:11:00.000Z",
    votes: 100,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 2,
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: "2020-10-16T05:03:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 3,
    title: "Eight pug gifs that remind me of mitch",
    topic: "mitch",
    author: "icellusedkars",
    body: "some gifs",
    created_at: "2020-11-03T09:12:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 4,
    title: "Student SUES Mitch!",
    topic: "mitch",
    author: "rogersop",
    body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
    created_at: "2020-05-06T01:14:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 5,
    title: "UNCOVERED: catspiracy to bring down democracy",
    topic: "cats",
    author: "rogersop",
    body: "Bastet walks amongst us, and the cats are taking arms!",
    created_at: "2020-08-03T13:14:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 6,
    title: "A",
    topic: "mitch",
    author: "icellusedkars",
    body: "Delicious tin of cat food",
    created_at: "2020-10-18T01:00:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 7,
    title: "Z",
    topic: "mitch",
    author: "icellusedkars",
    body: "I was hungry.",
    created_at: "2020-01-07T14:08:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 8,
    title: "Does Mitch predate civilisation?",
    topic: "mitch",
    author: "icellusedkars",
    body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
    created_at: "2020-04-17T01:08:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 9,
    title: "They're not exactly dogs, are they?",
    topic: "mitch",
    author: "butter_bridge",
    body: "Well? Think about it.",
    created_at: "2020-06-06T09:10:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 10,
    title: "Seven inspirational thought leaders from Manchester UK",
    topic: "mitch",
    author: "rogersop",
    body: "Who are we kidding, there is only one, and it's Mitch!",
    created_at: "2020-05-14T04:15:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 11,
    title: "Am I a cat?",
    topic: "mitch",
    author: "icellusedkars",
    body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
    created_at: "2020-01-15T22:21:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 12,
    title: "Moustache",
    topic: "mitch",
    author: "butter_bridge",
    body: "Have you seen the size of that thing?",
    created_at: "2020-10-11T11:24:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
  {
    article_id: 13,
    title: "Another article about Mitch",
    topic: "mitch",
    author: "butter_bridge",
    body: "There will never be enough articles about Mitch!",
    created_at: "2020-10-11T11:24:00.000Z",
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },
];

describe("formatArticles", () => {
  test("should remove the body property from an array of objects", () => {
    const testCommentsData = [
      { article_id: 1, count: 4 },
      { article_id: 2, count: 8 },
    ];
    const outputArray = formatArticles(testArticleData, testCommentsData);
    outputArray.forEach((object) => {
      expect(object).not.toHaveProperty("body");
    });
  });
  test("should add a comment count property based on how many comments are linked to the article ID", () => {
    const testArray = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: "2020-10-16T05:03:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const testCommentsData = [
      { article_id: 1, count: 4 },
      { article_id: 2, count: 8 },
    ];
    const outputArray = formatArticles(testArray, testCommentsData);
    outputArray.forEach((object) =>
      expect(object).toHaveProperty("comment_count")
    );
  });
  test("should add a comment count of 0 if there are no comments", () => {
    const testArray = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: "2020-10-16T05:03:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const testCommentsData = [
      { article_id: 1, count: 4 },
      { article_id: 3, count: 8 },
    ];
    const outputArray = formatArticles(testArray, testCommentsData);
    expect(outputArray[1].comment_count).toBe(0);
  });
});
test("should not mutate the original array and return a new array", () => {
  const testCommentsData = [
    { article_id: 1, count: 4 },
    { article_id: 2, count: 8 },
  ];
  const outputArray = formatArticles(testArticleData, testCommentsData);
  expect(testArticleData).toEqual(testArticleDataCopy);
  expect(outputArray).not.toBe(testArticleData);
});
