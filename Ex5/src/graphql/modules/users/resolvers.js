const { randomUUID } = require("crypto");
var jwt = require("jsonwebtoken");
const secret = require("../../../db/secret");
const User = require("../../../db/models/User");
const Post = require("../../../db/models/Post");

module.exports = {
  Query: {
    getUserById: async (_, { id }, { userId }) => {
      const findedUser = await User.findOne({
        id: id,
      });

      if (findedUser) {
        return findedUser;
      } else {
        throw new Error("Could not find user!");
      }
    },
    login: async (_, { email, password }) => {
      const userFounded = await User.findOne({
        email: String(email).toLowerCase(),
        password,
      });

      if (userFounded) {
        const token = jwt.sign({ data: userFounded.id }, secret);

        return {
          token: token,
          info: userFounded,
        };
      } else {
        throw new Error("Invalid email/password combination");
      }
    },
  },
  Mutation: {
    createUser: async (_, { email, username, password }) => {
      // first of all, see if email is in use!

      const emailInUse = await User.findOne({
        email: String(email).toLowerCase(),
      });

      if (emailInUse) {
        throw new Error("Email already in use!");
      } else {
        const newUser = {
          id: String(randomUUID()),
          email: String(email).toLowerCase(),
          username,
          password,
        };

        await User.create(newUser);

        return {
          token: jwt.sign({ data: newUser.id }, secret),
          info: newUser,
        };
      }
    },
    deleteAccount: async (_, __, { userId }) => {
      if (userId) {
        const findedUser = await User.findOne({ id: userId });

        if (findedUser) {
          await User.findOneAndDelete({
            id: userId,
          });

          await Post.remove({
            author: userId,
          });
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error("You are not authed!");
      }
    },
  },
};
