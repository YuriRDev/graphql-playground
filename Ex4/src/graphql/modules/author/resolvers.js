const db = require("../../../db");

module.exports = {
  Query: {
    listAuthors: () => {
      return db.authors;
    },
    getAuthorById: (_, { id }) => {
      return db.authors.find((author) => author.id == id);
    },
    createAuthor: (_, { name }) => {
      const newAuthor = {
        id: db.authors.length,
        name,
      };

      db.authors.push(newAuthor);
      return newAuthor;
    },
    deleteAuthor: (_, { id }) => {
      let author = db.authors.find((u) => u.id == id);
      if (author) {
        db.authors = db.authors.filter((u) => u.id != id);
        return true;
      } else {
        throw new Error("Could not find Author!");
      }
    },
    editAuthor: (_, { id, name }) => {
      let findedAuthor = db.authors.find((u) => u.id == id);
      if (findedAuthor) {
        findedAuthor.name = name;
        db.authors[id] = findedAuthor;

        return findedAuthor;
      } else {
        throw new Error("Could not find author!");
      }
    },
  },
};
