import { ApolloServer, gql } from "apollo-server";
import { Resolvers } from "src/types/graphql";
import RestaurantAPI from "./resAPI";

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
  Book: {}
};

const authors = [{ id: "1", name: "nakanishi" }, { id: "2", name: "satou" }];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    authors
  }),
  dataSources: () => ({
    restaurantAPI: new RestaurantAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

export default server;
