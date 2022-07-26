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

server.listen().then(({ url }) => {
  console.log(`🚀 Server started at ${url}`);
});
