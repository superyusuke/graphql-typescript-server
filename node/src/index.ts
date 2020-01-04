import { ApolloServer, gql } from "apollo-server";
import { Resolvers } from "src/types/graphql";
import { dataSources } from "src/dataSources";

const typeDefs = gql`
  type Query {
    getAuthor(id: String!): Author
  }
  type Author {
    name: String!
    id: ID!
    books: [Book!]!
  }
  type Book {
    title: String!
  }
`;

const resolvers: Resolvers = {
  Query: {
    getAuthor: (parent, args, context) => {
      const authors = context.authors;
      return authors.find(author => author.id === args.id);
    }
  },
  Author: {
    books: (_parent, _args, _context) => {
      return [{ title: `book title id#${_parent.id}` }];
    }
  },
  Book: {
    title: (_parent, _args, _context) => {
      const { dataSources } = _context;
      console.log(dataSources);
      // console.log(dataSources.restaurantApi);
      return dataSources.restaurantAPI.getHoge();
    }
  }
};

const authors = [{ id: "1", name: "nakanishi" }, { id: "2", name: "satou" }];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    authors
  }),
  dataSources: () => ({
    restaurantAPI: dataSources.restaurantAPI
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

export default server;
