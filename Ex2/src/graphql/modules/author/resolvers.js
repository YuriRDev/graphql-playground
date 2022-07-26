const db = require("../../../db")

module.exports = {
    Query: {
        listAuthors: () => {
            return db.author
        }
    }
}