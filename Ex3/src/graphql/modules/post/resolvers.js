const db = require("../../../db");

module.exports = {
  Post: {
    author: (obj) => {
      console.log(obj);
      return db.author.find((author) => obj.author == author.id);
    },
  },
  Query: {
    listPost: () => {
      return db.posts;
    },
    post: (_, args) => {
      return db.posts.find((post) => post.id == args.id);
    },
  },
  Mutation: {
    createPost: (_, args) => {
      // verificar se o titulo ja existe

      const id = db.posts.length;
      const data = {
        id: id,
        title: args.title,
        content: args.content,
        author: args.author,
      };

      db.posts.push(data);

      return data;
    },
  },
};
