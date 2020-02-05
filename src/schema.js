const { GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const TicketService = require("./services/ticket");
const UserService = require("./services/user");
const { profileResolver } = require("./util");

/*
  Schema looks like this

  type User {
    id: ID!
    name: String!
  }
  type Ticket {
    id: ID!
    author: User!
    content: String!
  }
  type Query {
    tickets: [Ticket!]!
  }

*/

function nonNull(type) {
  return new GraphQLNonNull(type);
}

function nonNullList(type) {
  return nonNull(new GraphQLList(nonNull(type)));
}

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: nonNull(GraphQLID),
      resolve: (user) => user.id,
    },
    name: {
      type: nonNull(GraphQLString),
      resolve: (user) => user.name,
    },
  },
});

const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: {
    id: {
      type: nonNull(GraphQLID),
      resolve: (ticket) => ticket.id,
    },
    content: {
      type: nonNull(GraphQLString),
      resolve: (ticket) => ticket.content,
    },
    author: {
      type: nonNull(UserType),
      resolve: profileResolver("resolve user", (ticket, _, ctx) => {
        return UserService.getUserById(ticket.authorId);
      }),
    },
  },
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      tickets: {
        type: nonNullList(TicketType),
        resolve: profileResolver("resolve all tickets", () => {
          return TicketService.getAllTickets();
        }),
      }
    }
  }),
});
