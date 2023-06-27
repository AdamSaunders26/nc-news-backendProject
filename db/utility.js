exports.formatArticles = (articleArray, commentArray) => {
  const commentCount = {};
  commentArray.forEach((comment) => {
    commentCount[comment.article_id] = comment.count;
  });

  return articleArray.map((object) => {
    const newObject = { ...object };
    if (commentCount[newObject.article_id] === undefined) {
      newObject.comment_count = 0;
    } else {
      newObject.comment_count = commentCount[newObject.article_id];
    }
    delete newObject.body;
    return newObject;
  });
};
