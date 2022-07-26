const db = require("../../../db")

module.exports = {
    Query: {
        listPerfils: () => {
            return db.perfils
        }
    }
}