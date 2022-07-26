const db = require("../../../db");

module.exports = {
  Query: {
    listAuthors: () => {
      return db.author;
    },
  },
  Mutation: {
    createAuthor: (_, args) => {
      const data = {
        id: db.author.length,
        name: args.name,
      };

      db.author.push(data);
      return data;
    },
  },
};
