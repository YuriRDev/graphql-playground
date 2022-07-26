const db = require("../../../db")

module.exports = {
    User: {
        perfil: (user) => {
            return db.perfils.find((perfil) => perfil.id == user.perfil_id)
        }
    },
    Query: {
        user: (_, args) => {
            return db.users.find((user) => user.id == args.id)
        },
        listUsers: () => {
            return db.users
        }
    }
}