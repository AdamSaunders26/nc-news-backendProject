exports.formatArticles = (array, commentCount) => {
  return array.map((object) => {
    const newObject = { ...object };
    delete newObject.body;
    return newObject;
  });
};
