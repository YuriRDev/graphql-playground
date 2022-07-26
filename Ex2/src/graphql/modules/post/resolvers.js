const db = require("../../../db");

module.exports = {
  Post: {
    author: (obj,) => {
      console.log(obj)
      return db.author.find((author) => obj.author == author.id)
    }
  },
  Query: {
    listPost: () => {
      return db.posts;
    },
    post: (_, args) => {
      return db.posts.find((post) => post.id == args.id);
    },
  },
};
