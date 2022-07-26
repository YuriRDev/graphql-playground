const db = require("../../../db");

module.exports = {
  Post: {
    author: (obj) => {
      return db.authors[obj.author_id];
    },
  },
  Query: {
    listPost: () => {
      return db.posts;
    },
    getPostById: (_, { id }) => {
      return db.posts.find((post) => post.id == id);
    },
  },
};
