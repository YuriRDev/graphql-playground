import { gql } from "apollo-server";

export default gql`
  type User {
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`;
