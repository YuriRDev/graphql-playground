const { randomUUID } = require("crypto");
const User = require("../../../db/models/User");

module.exports = {
  Query: {
    getUserById: async (_, { id }) => {
      const findedUser = await User.findOne({
        id: id,
      });

      if (findedUser) {
        return findedUser;
      } else {
        throw new Error("Could not find user!");
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
          token: "abc",
          info: newUser,
        };
      }
    },
  },
};
