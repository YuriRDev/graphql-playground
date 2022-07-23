const { ApolloServer, gql } = require("apollo-server");

const usersDB = [
  {
    name: "Yuri",
    email: "email@email.com",
    idade: 19,
    end: 0,
  },
  {
    name: "Pedro",
    email: "email2@email.com",
    idade: 25,
    end: 1,
  },
];

const endDb = [{
    rua: "Almirante tamandare",
    bairro: "Gutierrez",
    comp: "Apto 1000"
}, {
    rua: "Conego rocha franco",
    bairro: "Gutierrez",
    comp: "Apto 200"
}]

const typeDefs = gql`
  type Users {
    name: String
    email: String
    idade: Int
    endereco: Endereco
  }

  type Endereco {
    rua: String
    bairro: String
    comp: String
  }

  type Query {
    hello: String
    getUsers: [Users]
  }
`;

const resolvers = {
  Users: {
    endereco: (obj, args) => {
      console.log(obj);
      return endDb[obj.end];
    },
  },
  Query: {
    hello: () => "Hello World!",
    getUsers: () => {
      return usersDB;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server started at ${url}`);
});
