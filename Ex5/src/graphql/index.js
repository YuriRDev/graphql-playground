const { join } = require("path");

const mongoose = require("mongoose");

const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const allTypes = loadFilesSync(join(__dirname, "modules", "**", "*.gql"));
const allResolvers = loadFilesSync(
  join(__dirname, "modules", "**", "resolvers.js")
);

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);

////////////////////////////
// 🥗 MongoDB connection //
///////////////////////////
// Don't care that the password from DB is here, cause it's free & just testing. Probably gonna delete the DB after
mongoose
  .connect(`mongodb+srv://root:root@cluster0.rawr6it.mongodb.net/test`)
  .then(() => {
    console.log("💾 Database connected");
  })
  .catch(() => {
    console.log("⛔ Error to connect to Database");
  });

module.exports = { typeDefs, resolvers };
