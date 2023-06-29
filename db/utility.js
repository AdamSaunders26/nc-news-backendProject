// exports.formatArticles = (articleArray, commentArray) => {
//   const commentCount = {};
//   commentArray.forEach((comment) => {
//     commentCount[comment.article_id] = comment.count;
//   });

//   return articleArray.map((object) => {
//     const newObject = { ...object };
//     if (commentCount[newObject.article_id] === undefined) {
//       newObject.comment_count = 0;
//     } else {
//       newObject.comment_count = commentCount[newObject.article_id];
//     }
//     delete newObject.body;
//     return newObject;
//   });
// };

// exports.sortByComments = (articlesArray, order = "desc") => {
//   const sortedArray = [];
//   const articles = articlesArray.map((art) => {
//     const newObject = { ...art };
//     newObject.comment_count = Number(newObject.comment_count);
//     return newObject;
//   });

//   if (order === "asc") {
//     for (let i = 0; i < articles.length; i++) {
//       if (sortedArray.length === 0) {
//         sortedArray.push(articles[i]);
//       } else if (
//         articles[i].comment_count >
//         sortedArray[sortedArray.length - 1].comment_count
//       ) {
//         sortedArray.push(articles[i]);
//       } else if (articles[i].comment_count < sortedArray[0].comment_count) {
//         sortedArray.unshift(articles[i]);
//       } else {
//         for (let j = 0; j < sortedArray.length; j++) {
//           if (
//             articles[i].comment_count >= sortedArray[j].comment_count &&
//             articles[i].comment_count <= sortedArray[j + 1].comment_count
//           ) {
//             sortedArray.splice(j + 1, 0, articles[i]);
//             break;
//           }
//         }
//       }
//     }
//   } else if (order === "desc") {
//     for (let i = 0; i < articles.length; i++) {
//       if (sortedArray.length === 0) {
//         sortedArray.push(articles[i]);
//       } else if (
//         articles[i].comment_count <
//         sortedArray[sortedArray.length - 1].comment_count
//       ) {
//         sortedArray.push(articles[i]);
//       } else if (articles[i].comment_count > sortedArray[0].comment_count) {
//         sortedArray.unshift(articles[i]);
//       } else {
//         for (let j = 0; j < sortedArray.length; j++) {
//           if (
//             articles[i].comment_count <= sortedArray[j].comment_count &&
//             articles[i].comment_count >= sortedArray[j + 1].comment_count
//           ) {
//             sortedArray.splice(j + 1, 0, articles[i]);
//             break;
//           }
//         }
//       }
//     }
//   }

//   return sortedArray;
// };
