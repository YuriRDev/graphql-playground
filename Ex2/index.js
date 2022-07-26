const { ApolloServer, gql } = require("apollo-server");

const userDB = [
  {
    name: "Yuri",
    age: 14,
    email: "yuri@email.com",
  },
  {
    name: "Pedro",
    age: 24,
    email: "pedro@email.com",
  },
];

const typeDefs = gql`
  type User {
    age: Int
    name: String
    email: String
  }

  type Query {
    hello: String
    users: [User]
  }
`;
const resolvers = {
  User: {
    age: (obj) => (obj.age += 10),
  },
  Query: {
    hello: () => "Hello World!",
    users: () => {
      return userDB;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server started at ${url}`);
});
