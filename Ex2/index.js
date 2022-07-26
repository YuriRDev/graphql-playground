const { ApolloServer } = require("apollo-server");
const {typeDefs, resolvers} = require('./src/graphql')

const { makeExecutableSchema } = require('@graphql-tools/schema'); //necessário instalar antes -> npm i @graphql-tools/schema


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server started at ${url}`);
});
