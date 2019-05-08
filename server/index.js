const { ApolloServer, gql } = require('apollo-server');

const parts = [];

const typeDefs = gql`
  type Mutation {
    saveParts(parts: [PartInput!]!): Boolean
    removeParts(id: [ID!]!): Boolean
  }

  type Query {
    parts(groups: [String]!): [Part!]!
  }

  type Part {
    id: ID!
    group: String!
    type: String!
    index: Int!
    state: String
  }

  input PartInput {
    id: ID!
    group: String!
    type: String!
    index: Int!
    state: String
  }
`;

const resolvers = {
  Mutation: {
    saveParts: (_obj, args) => {
      
      args.parts.forEach(part => {
        parts.add(part);
      });
      
      console.log(args);
      console.log(parts);
    },
    removeParts: (_obj, args) => {
      console.log(args);
    }
  },
  Query: {
    parts: () => parts
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
