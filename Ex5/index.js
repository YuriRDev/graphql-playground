const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./src/graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      reqId: req.headers.my_id,
    };
  },
});

// 🥗 MongoDB connection //
// Don't care that the password from DB is here, cause it's free & just testing. Gonna delete the DB after

mongoose
  .connect(`mongodb+srv://root:root@cluster0.rawr6it.mongodb.net/test`)
  .then(() => {
    console.log("💾 Database connected");
  })
  .catch(() => {
    console.log("⛔ Error to connect to Database");
  });

//
// 👂 Server listen //
server.listen().then(({ url }) => {
  console.log(`🚀 Server started at ${url}`);
});
