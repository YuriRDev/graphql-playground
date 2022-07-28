const { randomUUID } = require("crypto");
const User = require("../../../db/models/User");
const Post = require("../../../db/models/Post");

module.exports = {
  Post: {
    author: async (obj) => {
      return User.findOne({
        id: obj.author,
      });
    },
  },
  Mutation: {
    createPost: async (_, { title, content }, { userId }) => {
      // verificar se user existe
      if (userId) {
        const foundedUser = await User.findOne({
          id: userId,
        });

        if (foundedUser) {
          const newPost = {
            id: String(randomUUID()),
            title,
            content,
            author: userId,
          };

          await Post.create(newPost);
          return newPost;
        } else {
          throw new Error("Invalid token!");
        }
      } else {
        throw new Error("You are not authed!");
      }
    },
    deletePost: async (_, { id }, { userId }) => {
      const findedPost = await Post.findOne({
        id: id,
      });

      if (findedPost) {
        if (findedPost.author == userId) {
          await Post.findOneAndDelete({
            id: id,
          });

          return true;
        } else {
          throw new Error("You are not the owner of this post!");
        }
      } else {
        throw new Error("Could not find post");
      }
    },
  },
  Query: {
    listPosts: async () => {
      const allPost = Post.find();
      return allPost;
    },
    getPostById: async (_, { id }) => {
      return await Post.findOne({
        id: id,
      });
    },
    listUsersPost: async (_, { id }) => {
      return await Post.find({
        author: id,
      });
    },
  },
};
