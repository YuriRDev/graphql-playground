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
    createPost: (_, { data }) => {
      // ver if title already exists

      const titleExist = db.posts.some((u) => u.title == data.title);
      if (titleExist) {
        throw new Error("Title already exists!");
      } else {
        const newPost = {
          id: db.posts.length,
          title: data.title,
          content: data.content,
          author: data.author,
        };

        db.posts.push(newPost);

        return newPost;
      }
    },
    deletePost: (_, { id }) => {
      const findPost = db.posts.find((u) => u.id == id);
      console.log(findPost);
      if (findPost) {
        db.posts = db.posts.filter((u) => u.id != id);
        return true;
      } else {
        return false;
      }
    },
  },
};
