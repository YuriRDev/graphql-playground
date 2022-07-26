const db = require("../../../db");

const { UserInputError } = require("apollo-server");

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
      // ver if title already exists

      const titleExist = db.posts.some((u) => u.title == args.title);
      if (titleExist) {
        throw new UserInputError("Title already exists!");
      } else {
        const data = {
          id: db.posts.length,
          title: args.title,
          content: args.content,
          author: args.author,
        };

        db.posts.push(data);

        return data;
      }
    },
  },
};
