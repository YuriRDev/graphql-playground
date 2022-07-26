// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "pg",
  connection: {
    database: "lallah.db.elephantsql.com",
    user: "lnkdjsqg",
    password: "0j1IEkGMjPPRFWw9U1OZTA2yGY2Dt-0q",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./Ex4/src/db/migrations",
  },
};
